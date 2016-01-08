# == Schema Information
#
# Table name: ingress_mission_series
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  created_at   :datetime
#  updated_at   :datetime
#  community_id :integer
#

FactoryGirl.define do
  factory :ingress_mission_series, class: 'Ingress::MissionSeries' do
  end
end
