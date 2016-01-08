# == Schema Information
#
# Table name: ingress_points
#
#  id          :integer          not null, primary key
#  lat         :decimal(9, 6)    not null
#  long        :decimal(9, 6)    not null
#  portal_name :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :ingress_point, class: 'Ingress::Point' do
    lat ''
    long ''
    portal_name 'MyString'
  end
end
