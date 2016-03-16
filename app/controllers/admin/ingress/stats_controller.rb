module Admin
  module Ingress
    class StatsController < Admin::BaseController
      skip_authorization_check

      def index
        @stats = {
          community: {
            live:    ::Ingress::Community.active.count,
            pending: ::Ingress::Community.inactive.count,
          },
          missions: {
            live:    ::Ingress::Mission.active.count,
            pending: ::Ingress::Mission.inactive.count,
          },
          mission_series: {
            live: ::Ingress::MissionSeries.count,
          },
          points: {
            live: ::Ingress::Point.count,
          },
          mission_points: {
            live: ::Ingress::MissionPoint.count,
          },
        }
      end
    end
  end
end
