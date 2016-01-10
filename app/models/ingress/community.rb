# == Schema Information
#
# Table name: ingress_communities
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Ingress
  class Community < ActiveRecord::Base
    validates :name, presence: true, uniqueness: true

    has_many :mission_points, inverse_of: :community
    has_many :mission_series, inverse_of: :community
    has_many :missions,       inverse_of: :community
  end
end
