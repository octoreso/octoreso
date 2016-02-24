module Admin
  module Ingress
    class CommunitiesController < Admin::BaseController
      def index
        @communities = ::Ingress::Community.all.limit(10)
      end

      def show
        @community = ::Ingress::Community.find(params[:id])
      end
    end
  end
end
