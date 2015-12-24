# == Schema Information
#
# Table name: ingress_mission_series
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

module Ingress
  class MissionSeries < ActiveRecord::Base
    has_many :missions, inverse_of: :mission_series

    belongs_to :community, inverse_of: :mission_series

    validates :name, presence: true
  end
end
