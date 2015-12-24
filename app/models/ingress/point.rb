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

module Ingress
  class Point < ActiveRecord::Base
    has_many :mission_points, inverse_of: :points

    has_many :missions, through: :mission_points, inverse_of: :points

    validates :lat,  presence: true, uniqueness: { scope: :long }
    validates :long, presence: true
  end
end
