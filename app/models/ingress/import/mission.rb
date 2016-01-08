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

        SEQUENCE_MAPPING = {
          'Sequential'        => :sequence_type_sequential,
          'Sequential Hidden' => :sequence_type_sequential_hidden,
          'Any Order'         => :sequence_type_any_order
        }

        SERIES_MAPPING = {
          'Banner'   => :series_type_banner,
          'Sequence' => :series_type_sequence,
          'Solo'     => :series_type_solo
        }

        FIELD_TRIP_WAYPOINT_MAPPING = {
          nil            => :field_trip_waypoint_type_not_set,
          'No'           => :field_trip_waypoint_type_none,
          'Yes (close)'  => :field_trip_waypoint_type_close,
          'Yes (medium)' => :field_trip_waypoint_type_medium,
          'Yes (far)'    => :field_trip_waypoint_type_far
        }

        PASSPHRASE_MAPPING = {
          nil              => :passphrase_type_not_set,
          'No'             => :passphrase_type_none,
          'Yes (Logical)'  => :passphrase_type_logical,
          'Yes (Research)' => :passphrase_type_research,
          'Yes (Other)'    => :passphrase_type_other
        }

        DIFFICULTY_MAPPING = {
          nil                                      => :difficulty_type_not_set,
          'All Hacks'                              => :difficulty_type_all_hacks,
          'All Capture / Upgrade'                  => :difficulty_type_all_capture_upgrade,
          'All Modding'                            => :difficulty_type_all_modding,
          'All Linking'                            => :difficulty_type_all_linking,
          'All Fielding'                           => :difficulty_type_all_fielding,
          'Easy Variety (Hack/Upgrade)'            => :difficulty_type_easy,
          'Hard Variety (Includes Mod/Link/Field)' => :difficulty_type_hard
        }
      end

      class_methods do
        # TODO: Modification from CSV -
        #
        # "Name" => "Edinburgh #1 - 18",
        # "Creator" => nil,
        # "Mission Link" => "https://www.ingress.com/mission/7176b31364aa486d8590b1e0b7ca1a4e.1c",
        # "Sequence Type" => "Sequential",
        # "Series Type" => "Banner",
        # "Series Name" => "Edinburgh",
        # "Series Index" => "1",
        # "Difficulty" => "All Hacks",
        # "Field Trip Waypoints" => "No",
        # "FT Qty" => "0",
        # "Passphrases" => "No",
        # "Trace Link" => "https://www.ingress.com/intel?ll=55.952197,-3.17503&z=18&pls=55.952257,-3.174327,55.952359,-3.175461_55.952359,-3.175461,55.952501,-3.175715_55.952501,-3.175715,55.952306,-3.175824_55.952306,-3.175824,55.952131,-3.176426_55.952131,-3.176426,55.951924,-3.176555"
        def create_from_csv!(row, community_name: nil)
          community             = community_name.present? ? Ingress::Community.where(name: community_name).first_or_create! : nil
          mission               = Ingress::Mission.new
          mission.community     = community
          mission.name          = row['Name']
          mission.agent         = Ingress::Agent.where(name: row['Creator']).first_or_create!
          mission.mission_url   = row['Mission Link']
          mission.sequence_type = SEQUENCE_MAPPING[row['Sequence Type']]
          mission.series_type   = SERIES_MAPPING[row['Series Type']]

          if row['Series Name'].present? && row['Series Name'] != '-'
            mission.mission_series = Ingress::MissionSeries.where(name: row['Series Name'], community: community).first_or_create!
            mission.series_index   = row['Series Index'].present? ? row['Series Index'] : nil
          end

          mission.difficulty_type          = DIFFICULTY_MAPPING[row['Difficulty']]
          mission.field_trip_waypoint_type = FIELD_TRIP_WAYPOINT_MAPPING[row['Field Trip Waypoints']]
          mission.field_trip_waypoint_qty  = row['FT Qty'].to_i
          mission.passphrase_type          = PASSPHRASE_MAPPING[row['Passphrases']]
          mission.trace_urls               = row['Trace Link']

          mission.save!
        end
      end
    end
  end
end
