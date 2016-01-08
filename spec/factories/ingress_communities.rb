# == Schema Information
#
# Table name: ingress_communities
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :ingress_community, class: 'Ingress::Community' do
    name 'MyString'
  end
end
