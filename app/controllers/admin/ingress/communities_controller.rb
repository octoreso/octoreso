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
          @community.save!(update_params)

          fail 'Inspect params!'
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
