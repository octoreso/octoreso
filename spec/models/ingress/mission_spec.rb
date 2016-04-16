# == Schema Information
#
# Table name: ingress_missions
#
#  id                :integer          not null, primary key
#  name              :string           not null
#  agent_id          :integer
#  mission_url       :string           not null
#  sequence_type     :integer          default(0), not null
#  series_type       :integer          default(0), not null
#  hidden_points     :integer          default(0), not null
#  mission_series_id :integer
#  series_index      :integer
#  created_at        :datetime
#  updated_at        :datetime
#  community_id      :integer
#  validation_level  :integer          default(0), not null
#  min_lat           :decimal(9, 6)
#  min_long          :decimal(9, 6)
#  max_lat           :decimal(9, 6)
#  max_long          :decimal(9, 6)
#  is_active         :boolean          default(FALSE), not null
#

require 'rails_helper'

RSpec.describe Ingress::Mission, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
