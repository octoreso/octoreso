# == Schema Information
#
# Table name: ingress_communities
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Ingress::Community, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
