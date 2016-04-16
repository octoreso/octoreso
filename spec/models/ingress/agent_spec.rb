# == Schema Information
#
# Table name: ingress_agents
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

require 'rails_helper'

RSpec.describe Ingress::Agent, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
