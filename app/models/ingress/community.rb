# == Schema Information
#
# Table name: ingress_communities
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  min_lat    :decimal(9, 6)
#  min_long   :decimal(9, 6)
#  max_lat    :decimal(9, 6)
#  max_long   :decimal(9, 6)
#

module Ingress
  class Community < ActiveRecord::Base
    validates :name, presence: true, uniqueness: true

    has_many :mission_points, inverse_of: :community
    has_many :mission_series, inverse_of: :community
    has_many :missions,       inverse_of: :community

    attr_accessor :updating_range

    def lat
      (max_lat + min_lat) / 2
    end

    def long
      (max_long + min_long) / 2
    end

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
      super(options.merge(methods: [:lat, :long]))
    end
  end
end
