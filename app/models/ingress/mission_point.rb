module Ingress
  class MissionPoint < ActiveRecord::Base
    belongs_to :mission, inverse_of: :mission_points
    belongs_to :point,   inverse_of: :mission_points
  end
end
