FactoryGirl.define do
  factory :ingress_user_community, class: 'Ingress::UserCommunity' do
    association :user,      factory: :user
    association :community, factory: :ingress_community
  end
end
