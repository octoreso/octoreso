FactoryGirl.define do
  factory :ingress_mission_point, class: 'Ingress::MissionPoint' do
    association :mission, factory: :ingress_mission
    association :point,   factory: :ingress_point

    action_type :action_type_hack
  end
end
