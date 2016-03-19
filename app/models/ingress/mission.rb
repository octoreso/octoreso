# == Schema Information
#
# Table name: ingress_missions
#
#  id                :integer          not null, primary key
#  name              :string           default(""), not null
#  agent_id          :integer
#  mission_url       :string           default(""), not null
#  sequence_type     :integer
#  series_type       :integer
#  hidden_points     :integer          default(0), not null
#  mission_series_id :integer
#  series_index      :integer
#  created_at        :datetime
#  updated_at        :datetime
#  community_id      :integer
#  validation_level  :integer          default(0), not null
#  min_lat           :decimal(9, 6)
#  min_long          :decimal(9, 6)
#  max_lat           :decimal(9, 6)
#  max_long          :decimal(9, 6)
#  is_active         :boolean          default(FALSE), not null
#

module Ingress
  class Mission < ActiveRecord::Base
    # include Import::Mission

    attr_accessor :from_csv_import
    attr_accessor :trace_urls
    attr_accessor :intel_json
    attr_accessor :updating_range

    after_save :update_range
    after_save :populate_from_intel_json

    # TODO: Can we refrain from inverting 3 times?
    belongs_to :community,          -> { active },   inverse_of: :missions
    belongs_to :proposed_community, -> { inactive }, inverse_of: :inactive_missions, class_name: 'Ingress::Community'
    belongs_to :admin_community,                     inverse_of: :all_missions,      class_name: 'Ingress::Community'

    has_many :user_completed_missions, inverse_of: :mission

    belongs_to :agent,                   inverse_of: :missions
    belongs_to :mission_series,          inverse_of: :missions
    belongs_to :proposed_mission_series, inverse_of: :missions, class_name: 'Ingress::MissionSeries'

    has_many :mission_points, inverse_of: :mission, dependent: :destroy

    has_many :points, through: :mission_points, inverse_of: :missions

    has_many :users_completed,
      through: :user_completed_missions,
      inverse_of: :completed_missions,
      class_name: 'User',
      source: :user

    scope :active, -> { where(is_active: true) }
    scope :inactive, -> { where(is_active: false) }

    validates :mission_url,   presence: true, uniqueness: true
    validates :name,          presence: true, if: :is_active
    validates :community_id,  presence: true, if: :is_active
    validates :agent_id,      presence: true, if: :is_active
    validates :sequence_type, presence: true, if: :is_active
    validates :series_type,   presence: true, if: :is_active

    enum sequence_type: {
      sequence_type_sequential:        1,
      sequence_type_any_order:         2,
      sequence_type_sequential_hidden: 3
    }

    enum series_type: {
      series_type_solo:     1,
      series_type_sequence: 2,
      series_type_banner:   3
    }

    class << self
      def for_coords(n:, e:, s:, w:)
        lat  = "min_lat + ((max_lat - min_lat) / 2)"
        long = "min_long + ((max_long - min_long) / 2)"

        target_lat = s.to_f + ((n.to_f - s.to_f) / 2)
        target_long = e.to_f + ((w.to_f - e.to_f) / 2)

        squared_error = "(pow(#{lat} - #{target_lat}, 2) + pow(#{long} - #{target_long}, 2))"

        self
          .select(*column_names, "#{squared_error} AS distance")
          .where.not('min_lat > ?', n)
          .where.not('max_lat < ?',  s)
          .where.not('min_long > ?', e)
          .where.not('max_long < ?', w)
          .order('distance')
      end

      def page(number)
        page_size = 400

        self.limit(page_size).offset((number - 1) * page_size)
      end

      def modify_from_form!(community, mission_data)
        # Load if exists
        mission = ::Ingress::Mission.find_by(id: mission_data[:id])

        # Try to find by mission link otherwise
        mission ||= ::Ingress::Mission.find_by(mission_url: mission_data[:mission_url])

        # Or create if not present.
        mission ||= community.missions.new(community_id: community.id)

        # Delete the mission if needed
        if mission.present? && mission_data['_destroy'].present? && mission_data['_destroy'] == '1'
          mission.destroy!
          return nil
        end

        # Skip if no Url
        if mission.new_record? && mission_data['mission_url'].blank?
          mission.errors.add(:base, "Blank mission was deleted - missions must always contain a mission_url")
          mission.destroy!
          return nil
        end

        # Check if exists in other communities
        if mission.community_id != community.id
          mission.errors.add(:base, "Mission #{mission.mission_url} already exists in #{community}")
          return mission
        end

        # Add all data from mission_data hash
        mission_data.each do |key, value|
          next if ['id', '_destroy'].include?(key)

          mission.public_send("#{key}=", value)
        end

        mission
      end
    end

    def mission_series_name
      mission_series.try(:name)
    end

    def mission_series_name=(name)
      old_mission_series = mission_series

      if name.blank?
        self.mission_series = nil unless self.mission_series.blank?
      else
        self.mission_series = Ingress::Community.find(community_id).mission_series.where(name: name).first_or_create!
      end

      old_mission_series.try(:prune_if_empty!)
    end

    def update_range
      return if updating_range
      return if mission_points.blank?

      self.min_lat = nil
      self.max_lat = nil
      self.min_long = nil
      self.max_long = nil

      mission_points.each do |mission_point|
        point = mission_point.pointl

        if self.min_lat.nil?
          self.min_lat = point.lat
          self.max_lat = point.lat
          self.min_long = point.long
          self.max_long = point.long
        else
          self.min_lat = [self.min_lat, point.lat].min unless point.lat.nil?
          self.max_lat = [self.max_lat, point.lat].max unless point.lat.nil?
          self.min_long = [self.min_long, point.long].min unless point.long.nil?
          self.max_long = [self.max_long, point.long].max unless point.long.nil?
        end
      end

      self.updating_range = true

      puts self.mission_url

      save!
      # Save
      mission_series.try(:update_range)
      Ingress::Community.find(self.community_id).update_range
    end

    def populate_from_intel_json
      return unless intel_json.present?

      json = JSON.parse(intel_json)['result']
      self.intel_json = nil

      populate_metadata_from_intel_json(json)
      save!
      populate_points_from_intel_json(json)
      self.is_active = true
      save!
      Ingress::Community.find(community_id).update_attributes!(is_active: true)
    end


    def populate_metadata_from_intel_json(json)
      # TODO: Validate against link + unique_id mismatch
      # self.unique_id   = json[0]
      self.name = json[1]
      # self.description = json[2]
      self.agent = Ingress::Agent.where(name: json[3]).first_or_create!
      self.sequence_type = json[8]

      if self.mission_series.present?
        self.series_type = :series_type_sequence
      else
        self.series_type = :series_type_solo
      end
    end

    def populate_points_from_intel_json(json)
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
          self.hidden_points += 1
        else
          if point_type == 1
            lat  = point_data[5][2].to_f / 1_000_000.0
            long = point_data[5][3].to_f / 1_000_000.0
          elsif point_type == 2
            lat  = point_data[5][1].to_f / 1_000_000.0
            long = point_data[5][2].to_f / 1_000_000.0
          end

          point = Ingress::Point.where(lat: lat, long: long).first_or_create!

          self.mission_points << Ingress::MissionPoint.where(mission: self, point: point, action_type: action).first_or_create!
        end
      end
    end



    # Take "offline", clear all live data so that new JSON will be added.
    def deactivate
      self.is_active = false
      self.mission_points.destroy_all
    end
  end
end
