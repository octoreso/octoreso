# == Schema Information
#
# Table name: ingress_missions
#
#  id                :integer          not null, primary key
#  name              :string           not null
#  agent_id          :integer          not null
#  mission_url       :string           not null
#  sequence_type     :integer          not null
#  series_type       :integer          not null
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
#

module Ingress
  class Mission < ActiveRecord::Base
    include Import::Mission

    attr_accessor :from_csv_import
    attr_accessor :trace_urls
    attr_accessor :intel_json
    attr_accessor :updating_range

    after_save :update_range

    # TODO: Can we refrain from inverting 3 times?
    belongs_to :community,          -> { active },   inverse_of: :missions
    belongs_to :proposed_community, -> { inactive }, inverse_of: :inactive_missions, class_name: 'Ingress::Community'
    belongs_to :admin_community,                     inverse_of: :all_missions,      class_name: 'Ingress::Community'

    belongs_to :agent,              inverse_of: :missions
    belongs_to :mission_series,     inverse_of: :missions

    has_many :mission_points, inverse_of: :mission, dependent: :destroy

    has_many :points, through: :mission_points, inverse_of: :missions

    scope :active, -> { where(is_active: true) }
    scope :inactive, -> { where(is_active: false) }
    scope :awaiting_moderation, ->{ inactive.where("mission_url LIKE 'https://%'") }

    validates :name,                     presence: true
    validates :community_id,             presence: true
    validates :agent_id,                 presence: true
    validates :mission_url,              presence: true, uniqueness: true
    validates :sequence_type,            presence: true
    validates :series_type,              presence: true

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
    end

    def mission_series_name
      mission_series.try(:name)
    end

    def mission_series_name=(name)
      return if name.blank?

      self.mission_series = community.mission_series.find_by(name: name)

      fail "Can't assign mission series name yet!" if mission_series.blank?
    end

    def update_range
      return if updating_range
      return if mission_points.blank?

      mission_points.each do |mission_point|
        point = mission_point.point

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
      community.update_range
    end

    # Take "offline", clear all live data so that new JSON will be added.
    def deactivate
      self.is_active = false
      self.mission_points.destroy_all
    end
  end
end
