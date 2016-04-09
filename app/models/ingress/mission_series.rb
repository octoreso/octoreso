# == Schema Information
#
# Table name: ingress_mission_series
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  created_at   :datetime
#  updated_at   :datetime
#  community_id :integer
#  min_lat      :decimal(9, 6)
#  min_long     :decimal(9, 6)
#  max_lat      :decimal(9, 6)
#  max_long     :decimal(9, 6)
#

module Ingress
  class MissionSeries < ActiveRecord::Base
    has_many :missions, -> { active }, inverse_of: :mission_series

    has_many :all_missions, class_name: 'Ingress::Mission'

    belongs_to :community, inverse_of: :mission_series

    validates :name, presence: true

    attr_accessor :updating_range

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
        page_size = 25

        self.limit(page_size).offset((number - 1) * page_size)
      end
    end

    def missions_by_index
      missions.sort_by(&:series_index)
    end

    def update_range
      return if updating_range

      self.min_lat  = nil
      self.max_lat  = nil
      self.min_long = nil
      self.max_long = nil

      missions.each do |mission|
        if self.min_lat.nil?
          self.min_lat  = mission.min_lat
          self.max_lat  = mission.max_lat
          self.min_long = mission.min_long
          self.max_long = mission.max_long
        else
          self.min_lat  = [self.min_lat, mission.min_lat].min unless mission.min_lat.nil?
          self.max_lat  = [self.max_lat, mission.max_lat].max unless mission.max_lat.nil?
          self.min_long = [self.min_long, mission.min_long].min unless mission.min_long.nil?
          self.max_long = [self.max_long, mission.max_long].max unless mission.max_long.nil?
        end
      end

      self.updating_range = true
      save!
    end

    def prune_if_empty!
      destroy! if all_missions.blank?
    end
  end
end
