FactoryGirl.define do
  factory :ingress_user_completed_mission, class: 'Ingress::UserCompletedMission' do
    association :user,    factory: :user
    association :mission, factory: :ingress_mission
  end
end
