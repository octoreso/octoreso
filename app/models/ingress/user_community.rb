# == Schema Information
#
# Table name: ingress_user_communities
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  community_id :integer
#

module Ingress
  class UserCommunity < ActiveRecord::Base
    belongs_to :user,      class_name: 'User'
    belongs_to :community, class_name: 'Ingress::Community'
  end
end
