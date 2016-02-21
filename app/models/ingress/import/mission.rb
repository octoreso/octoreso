module Ingress
  module Import
    module Mission
      extend ActiveSupport::Concern

      included do
        SERIES_MAPPING = {
          'Banner'   => :series_type_banner,
          'Sequence' => :series_type_sequence,
          'Solo'     => :series_type_solo
        }
      end

      class_methods do
        def create_from_csv!(row, community_name: nil)
          community             = community_name.present? ? Ingress::Community.where(name: community_name).first_or_create! : nil
          mission               = Ingress::Mission.new
          mission.community     = community
          mission.mission_url   = row['Mission Link']
          mission.series_type   = SERIES_MAPPING[row['Series Type']]

          if row['Series Name'].present? && row['Series Name'] != '-'
            mission.mission_series = Ingress::MissionSeries.where(name: row['Series Name'], community: community).first_or_create!
            mission.series_index   = row['Series Index'].present? ? row['Series Index'] : nil
          end

          json = JSON.parse(row['Intel JSON'])['result']

          mission = populate_metadata_from_intel_json(mission, json)
          mission.save!
          mission = populate_points_from_intel_json(mission, json)
          mission.save!
        end

        def populate_metadata_from_intel_json(mission, json)
          # TODO: Validate against link + unique_id mismatch
          # self.unique_id   = json[0]
          mission.name = json[1]
          # self.description = json[2]
          mission.agent = Ingress::Agent.where(name: json[3]).first_or_create!
          mission.sequence_type = json[8]

          mission
        end

        def populate_points_from_intel_json(mission, json)
          json[9].each do |point_data|
            # We will not store portal names or state data. The aim is to minimise the use of Ingress's intellectual
            # property solely to that useful for mission running by both sides. Storing detailed portal information makes
            # the tool closer to a conventional scraper which is both bad from a TOS compliance and moral perspective!
            # This is why The model is labelled "Point" not "Portal" - from the point of view of the system it's an
            # uninteresting node in the larger system of missions and mission series.
            lat = 0
            long = 0

            # unique_id = point_data[1]
            point_type = point_data[3] # 1 = Portal 2 = Field Trip
            action     = point_data[4] # Hack/Cap/etc

            if point_data[5].nil?  # deleted portals? No action can be performed on "nothing"
              mission.hidden_points += 1
            else
              if point_type == 1
                lat  = point_data[5][2].to_f / 1_000_000.0
                long = point_data[5][3].to_f / 1_000_000.0
              elsif point_type == 2
                lat  = point_data[5][1].to_f / 1_000_000.0
                long = point_data[5][2].to_f / 1_000_000.0
              end

              point = Ingress::Point.where(lat: lat, long: long).first_or_create!

              mission.mission_points << Ingress::MissionPoint.where(mission: mission, point: point, action_type: action).first_or_create!
            end
          end

          mission
        end
      end
    end
  end
end
