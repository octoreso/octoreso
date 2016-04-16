# == Schema Information
#
# Table name: ingress_user_completed_missions
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  mission_id :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'rails_helper'

RSpec.describe Ingress::UserCompletedMission, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
