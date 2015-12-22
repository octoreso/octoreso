# == Schema Information
#
# Table name: ingress_agents
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

module Ingress
  class Agent < ActiveRecord::Base
    has_many :missions, inverse_of: :agent

    validates :name, presence: true
  end
end
