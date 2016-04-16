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

require 'rails_helper'

RSpec.describe Ingress::MissionSeries, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
