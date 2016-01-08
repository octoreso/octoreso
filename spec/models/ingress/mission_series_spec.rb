# == Schema Information
#
# Table name: ingress_mission_series
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  created_at   :datetime
#  updated_at   :datetime
#  community_id :integer
#

require 'rails_helper'

RSpec.describe Ingress::MissionSeries, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
