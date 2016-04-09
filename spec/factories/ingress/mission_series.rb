FactoryGirl.define do
  factory :ingress_mission_series, class: 'Ingress::MissionSeries' do
    sequence(:name) { |i| "MissionSeries_#{i}" }
  end
end
