# == Schema Information
#
# Table name: ingress_mission_series
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  created_at   :datetime
#  updated_at   :datetime
#  community_id :integer
#

module Ingress
  class MissionSeries < ActiveRecord::Base
    has_many :missions, inverse_of: :mission_series

    belongs_to :community, inverse_of: :mission_series

    validates :name, presence: true

    attr_accessor :updating_range

    def update_range
      return if updating_range

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

    def as_json(options = {})
      super(options.merge(include: [:community, missions: { include: :points }]))
    end
  end
end
