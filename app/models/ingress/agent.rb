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
  end
end
