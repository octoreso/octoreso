# == Schema Information
#
# Table name: ingress_mission_points
#
#  id         :integer          not null, primary key
#  mission_id :integer
#  point_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Ingress
  class MissionPoint < ActiveRecord::Base
    belongs_to :community, inverse_of: :mission_points
    belongs_to :mission,   inverse_of: :mission_points
    belongs_to :point,     inverse_of: :mission_points
  end
end
