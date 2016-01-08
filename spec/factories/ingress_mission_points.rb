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

FactoryGirl.define do
  factory :ingress_mission_point, class: 'Ingress::MissionPoint' do
    mission ''
    point ''
  end
end
