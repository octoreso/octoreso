module Ingress
  class Community < ActiveRecord::Base
    validates :name, presence: true, uniqueness: true

    has_many :mission_series, inverse_of: :community
    has_many :missions,       inverse_of: :community
  end
end
