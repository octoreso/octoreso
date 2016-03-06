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
#  is_active  :boolean          default(FALSE), not null
#

module Ingress
  class Community < ActiveRecord::Base
    validates :name, presence: true, uniqueness: true

    has_many :mission_series,   inverse_of: :community, dependent: :destroy
    has_many :user_communities, inverse_of: :community, dependent: :destroy

    has_many :missions, ->{ active }, inverse_of: :community,
      dependent: :destroy

    has_many :inactive_missions, ->{ inactive }, inverse_of: :proposed_community,
      dependent: :destroy, class_name: 'Ingress::Mission'

    has_many :all_missions, ->{ order(:mission_series_id, :series_index, :name) }, inverse_of: :admin_community,
      dependent: :destroy, class_name: 'Ingress::Mission'

    has_many :mission_points, through: :missions
    has_many :users,          through: :user_communities


    scope :active, -> { where(is_active: true) }
    scope :inactive, -> { where(is_active: false) }

    attr_accessor :updating_range

    accepts_nested_attributes_for :all_missions,reject_if: :all_blank, allow_destroy: true

    def lat
      (max_lat + min_lat) / 2
    end

    def long
      (max_long + min_long) / 2
    end

    def to_s
      name
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
  end
end
