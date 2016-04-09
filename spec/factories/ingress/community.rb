FactoryGirl.define do
  factory :ingress_community, class: 'Ingress::Community' do
    sequence(:name) { |i| "Community_#{i}" }
  end
end
