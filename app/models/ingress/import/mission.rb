module Ingress
  module Import
    module Mission
      extend ActiveSupport::Concern

      included do
        CSV_MAPPING = {
          'Name'                 => :name,
          'Creator'              => :agent_id,
          'Mission Link'         => :mission_url,
          'Sequence Type'        => :sequence_type,
          'Series Type'          => :series_type,
          'Series Name'          => :mission_series_id,
          'Series Index'         => :series_index,
          'Difficulty'           => :difficulty_type,
          'Field Trip Waypoints' => :field_trip_waypoint_type,
          'FT Qty'               => :field_trip_waypoint_qty,
          'Passphrases'          => :passphrase_type,
          'Trace Link'           => :trace_urls
        }
      end

      class_methods do
        def create_from_csv!(row)
          binding.pry
        end
      end
    end
  end
end
