FactoryGirl.define do
  factory :ingress_mission, class: 'Ingress::Mission' do
    sequence(:name) { |i| "MissionSeries_#{i}" }
    association :agent, factory: :ingress_agent
    sequence(:mission_url) { |i| "https://www.ingress.com/mission/#{Digest::SHA1.hexdigest(i.to_s)[-32..-1]}.1c" }
    sequence_type :sequence_type_sequential
    series_type :series_type_solo
    association :community, factory: :ingress_community
  end
end
