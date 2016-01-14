# == Schema Information
#
# Table name: ingress_points
#
#  id          :integer          not null, primary key
#  lat         :decimal(9, 6)    not null
#  long        :decimal(9, 6)    not null
#  portal_name :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module Ingress
  class Point < ActiveRecord::Base
    has_many :mission_points, inverse_of: :point

    has_many :missions, through: :mission_points, inverse_of: :points

    after_save :update_mission_range

    validates :lat,  presence: true, uniqueness: { scope: :long }
    validates :long, presence: true

    private

    def update_mission_range
      missions.map(&:update_range)
    end
  end
end
