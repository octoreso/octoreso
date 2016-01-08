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

require 'rails_helper'

RSpec.describe Ingress::MissionPoint, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
