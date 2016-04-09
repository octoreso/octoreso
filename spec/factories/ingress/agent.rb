FactoryGirl.define do
  factory :ingress_agent, class: 'Ingress::Agent' do
    sequence(:name) { |i| "Agent_#{i}" }
  end
end
