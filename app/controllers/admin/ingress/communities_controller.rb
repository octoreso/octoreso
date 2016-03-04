module Admin
  module Ingress
    class CommunitiesController < Admin::BaseController
      def index
        @communities = ::Ingress::Community.includes(:all_missions).all
      end

      def show
        @community = ::Ingress::Community.includes(:all_missions).find(params[:id])
      end
    end
  end
end
