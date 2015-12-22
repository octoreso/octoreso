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
  end
end
