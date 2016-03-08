module Admin
  module Ingress
    class CommunitiesController < Admin::BaseController
      # TODO: Move 90% of this logic into the models after POC is successful.
      include ActionView::Helpers::TextHelper
      include ActionView::Helpers::UrlHelper


      def index
        @communities = ::Ingress::Community
          .includes(all_missions: :mission_series)
          .accessible_by(current_ability)
          .order(:name)

        authorize! :edit, ::Ingress::Community
      end

      def show
        @community = ::Ingress::Community
          .includes(all_missions: :mission_series)
          .accessible_by(current_ability)
          .find(params[:id])

        authorize! :edit, @community
      end

      def update
        @community = ::Ingress::Community
          .includes(all_missions: :mission_series)
          .accessible_by(current_ability).find(params[:id])

        authorize! :edit, @community

        changed_missions = 0
        all_valid        = true

        ActiveRecord::Base.transaction do
          begin
            # Don't actually save using update_params directly, iterate through missions individually
            parameters = update_params

            if parameters['all_missions_attributes'].blank?
              raise ActiveRecord::Rollback, 'No missions'
            else
              parameters['all_missions_attributes'].each do |index, mission_data|
                mission = ::Ingress::Mission.modify_from_form!(@community, mission_data)

                # Bail unless changes happened so we don't deactivate entire form.
                next if mission.nil?
                next unless mission.changed? || mission.new_record?

                changed_missions += 1

                mission.deactivate
                mission.save
                mission.valid?
                # iterate over mission.errors, adding them back to main hash
                mission.errors.each do |mission_error|
                  @community.errors.add :base, mission_error
                end

                all_valid = false unless mission.errors.empty?
              end
            end
            raise ActiveRecord::Rollback, "Some missions contain errors" unless all_valid
          rescue ActiveRecord::Rollback => e
            @community.errors.add(:base, e.message)
            flash.now[:alert] = @community.errors.full_message

          end
        end

        if all_valid
          redirect_to admin_ingress_communities_path,
            notice: "Missions updated for '<strong>#{link_to @community, admin_ingress_community_path(@community)}</strong>' Community.".html_safe
        else
          render action: :show
        end
      end

      private

      def update_params
        params.require(:ingress_community).permit(
          all_missions_attributes: [
            :id, :mission_series_name, :series_index, :mission_url, :_destroy
          ]
        )
      end
    end
  end
end
