module Admin
  module Ingress
    class CommunitiesController < Admin::BaseController
      def index
        @communities = ::Ingress::Community.includes(:all_missions).all
      end

      def show
        @community = ::Ingress::Community.includes(:all_missions).find(params[:id])
      end

      def update
        @community = ::Ingress::Community.includes(:all_missions).find(params[:id])

        ActiveRecord::Base.transaction do
          all_valid = true

          begin
            # Don't actually save using update_params directly, iterate through missions individually
            parameters = update_params

            if parameters['all_missions_attributes'].blank?
              raise ActiveRecord::Rollback, 'No missions'
            else
              parameters['all_missions_attributes'].each do |index, mission_data|
                # Load if exists
                mission = ::Ingress::Mission.find_by(id: mission_data[:id])

                # Try to find by mission link otherwise
                mission ||= ::Ingress::Mission.find_by(mission_url: mission_data[:mission_url])

                # Check if exists in other communities
                if mission.present? && mission.community != @community
                  raise ActiveRecord::Rollback, "Mission #{mission_url} already exists in #{@community}"
                end

                # Or create if not present.
                mission ||= @community.missions.new

                # Delete the mission if needed
                if mission_data['_destroy'].present? && mission_data['_destroy'] == "1"
                  mission.destroy!
                  next
                end

                # Add all data from mission_data hash
                mission_data.each do |key, value|
                  next if ['id', '_destroy'].include?(key)

                  mission.public_send("#{key}=", value)
                end

                # Bail unless changes happened so we don't deactivate entire form.
                next unless mission.changed?

                #
                mission.deactivate
                mission.save
                mission.valid?
                # iterate over mission.errors, adding them back to main hash
                all_valid = false unless mission.errors.empty?
              end
            end

            raise ActiveRecord::Rollback, "Some missions contain errors" unless all_valid
          rescue ActiveRecord::Rollback => e
            @community.errors.add(:base, e.message)
            Rails.logger.info e.message
            raise e
          end
        end

        render :show
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
