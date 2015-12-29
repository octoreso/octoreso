# == Schema Information
#
# Table name: ingress_points
#
#  id          :integer          not null, primary key
#  lat         :decimal(, )      not null
#  long        :decimal(, )      not null
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
