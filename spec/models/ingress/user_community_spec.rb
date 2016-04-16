# == Schema Information
#
# Table name: ingress_user_communities
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  community_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#

require 'rails_helper'

RSpec.describe Ingress::UserCommunity, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
