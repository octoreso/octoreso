# == Schema Information
#
# Table name: ingress_missions
#
#  id                       :integer          not null, primary key
#  name                     :string           not null
#  agent_id                 :integer          not null
#  mission_url              :string           not null
#  sequence_type            :integer          not null
#  series_type              :integer          not null
#  mission_series_id        :integer
#  series_index             :integer
#  difficulty_type          :integer          default(0), not null
#  field_trip_waypoint_type :integer          default(0), not null
#  field_trip_waypoint_qty  :integer          default(0), not null
#  passphrase_type          :integer          not null
#  created_at               :datetime
#  updated_at               :datetime
#  community_id             :integer
#  validation_level         :integer          default(0), not null
#  min_lat                  :decimal(9, 6)
#  min_long                 :decimal(9, 6)
#  max_lat                  :decimal(9, 6)
#  max_long                 :decimal(9, 6)
#

module Ingress
  class Mission < ActiveRecord::Base
    include Import::Mission

    attr_accessor :from_csv_import
    attr_accessor :trace_urls
    attr_accessor :intel_json
    attr_accessor :updating_range

    before_validation :initial_target_validation_level, on: :create
    after_create :populate_from_trace_urls
    after_create :populate_from_intel_json
    after_save :update_range

    belongs_to :community,      inverse_of: :missions
    belongs_to :agent,          inverse_of: :missions
    belongs_to :mission_series, inverse_of: :missions

    has_many :mission_points, inverse_of: :mission

    has_many :points, through: :mission_points, inverse_of: :missions



    validates :name,                     presence: true
    validates :agent_id,                 presence: true
    validates :mission_url,              presence: true, uniqueness: true
    # validates :sequence_type,            presence: true, if: :validation_level_two
    # validates :series_type,              presence: true, if: :validation_level_two
    # validates :difficulty_type,          presence: true, if: :validation_level_three
    # validates :field_trip_waypoint_type, presence: true, if: :validation_level_three
    # validates :field_trip_waypoint_qty,  presence: true, if: :validation_level_three
    # validates :passphrase_type,          presence: true, if: :validation_level_three
    validates :validation_level,         inclusion: { in: 1..4 }

    enum sequence_type: {
      sequence_type_sequential:        1,
      sequence_type_sequential_hidden: 2,
      sequence_type_any_order:         3
    }

    enum series_type: {
      series_type_solo:     1,
      series_type_sequence: 2,
      series_type_banner:   3
    }

    # TODO: Do we wish to redo as bitmask, reassigning 17/18 manually?
    # enum difficulty_type: {
    #   difficulty_type_not_set:             0,
    #   difficulty_type_all_hacks:           1,
    #   difficulty_type_all_capture_upgrade: 2,
    #   difficulty_type_all_modding:         4,
    #   difficulty_type_all_linking:         8,
    #   difficulty_type_all_fielding:        16,
    #   difficulty_type_easy:                17,
    #   difficulty_type_hard:                18
    # }

    enum passphrase_type: {
      passphrase_type_not_set:  0,
      passphrase_type_none:     1,
      passphrase_type_logical:  2,
      passphrase_type_research: 3,
      passphrase_type_other:    4
    }

    enum field_trip_waypoint_type: {
      field_trip_waypoint_type_not_set: 0,
      field_trip_waypoint_type_none:    1,
      field_trip_waypoint_type_close:   2,
      field_trip_waypoint_type_medium:  3,
      field_trip_waypoint_type_far:     4
    }

    def populate_from_trace_urls
      return unless trace_urls.present?

      # links = trace_urls.split("\n")
      # links.each do |link|
      #   params = link.gsub('https://www.ingress.com/intel?', '').split('&')
      #   coords = params.detect { |param| /pls=/.match(param) }.gsub('pls=', '').split(/[,_]/)
      #
      #   coords.each_slice(2) do |lat, long|
      #     point = Ingress::Point.where(lat: lat, long: long).first_or_create!
      #     Ingress::MissionPoint.where(mission: self, point: point).first_or_create!
      #   end
      # end

      self.trace_urls = nil
    end

    def populate_from_intel_json
      return unless intel_json.present?

      json = JSON.parse(intel_json)['result']

      # TODO: Validate against link + unique_id mismatch
      # self.unique_id   = json[0]
      self.name = json[1]
      # self.description = json[2]
      self.agent = Ingress::Agent.where(name: json[3]).first_or_create!

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

        if point_type == 1
          lat  = point_data[5][2].to_f / 1_000_000.0
          long = point_data[5][3].to_f / 1_000_000.0
        elsif point_type == 2
          lat  = point_data[5][1].to_f / 1_000_000.0
          long = point_data[5][2].to_f / 1_000_000.0
        end

        point = Ingress::Point.where(lat: lat, long: long).first_or_create!

        Ingress::MissionPoint.where(mission: self, point: point, action_type: action).first_or_create!
      end
    end


    def as_json(options = {})
      super(options.merge(include: [:mission_series, :agent, mission_points: { include: :point }]))
    end

    def update_range
      return if updating_range

      points.each do |point|
        if self.min_lat.nil?
          self.min_lat = point.lat
          self.max_lat = point.lat
          self.min_long = point.long
          self.max_long = point.long
        else
          self.min_lat  = [self.min_lat, point.lat].min unless point.lat.nil?
          self.max_lat  = [self.max_lat, point.lat].max unless point.lat.nil?
          self.min_long = [self.min_long, point.long].min unless point.long.nil?
          self.max_long = [self.max_long, point.long].max unless point.long.nil?
        end
      end

      self.updating_range = true

      save!
      # Save
      mission_series.try(:update_range)
    end

    private

    def initial_target_validation_level
      self.validation_level = 0
      return unless [name, agent, mission_url].all?(&:present?)
      self.validation_level = 1
      return unless [sequence_type, series_type].all?(&:present?)
      self.validation_level = 2
      return unless [difficulty_type, field_trip_waypoint_type, passphrase_type].all?(&:present?)
      self.validation_level = 3
      return unless [trace_urls, mission_points].any?(&:present?)
      self.validation_level = 4
    end

    def validation_level_one
      validation_level >= 1
    end

    def validation_level_two
      validation_level >= 2
    end

    def validation_level_three
      validation_level >= 3
    end

    def validation_level_four
      validation_level >= 4
    end
  end
end
