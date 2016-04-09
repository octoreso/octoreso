FactoryGirl.define do
  factory :ingress_point, class: 'Ingress::Point' do
    sequence(:lat) { |i| "54.#{Digest::SHA1.hexdigest(i.to_s)[-6..-1].to_i(16).to_s[-6..-1]}" }
    sequence(:long) { |i| "-1.#{Digest::SHA1.hexdigest((i+1).to_s)[-6..-1].to_i(16).to_s[-6..-1]}" }
  end
end
