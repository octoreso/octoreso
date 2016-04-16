# == Schema Information
#
# Table name: ingress_communities
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  min_lat    :decimal(9, 6)
#  min_long   :decimal(9, 6)
#  max_lat    :decimal(9, 6)
#  max_long   :decimal(9, 6)
#  is_active  :boolean          default(FALSE), not null
#

require 'rails_helper'

RSpec.describe Ingress::Community, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
