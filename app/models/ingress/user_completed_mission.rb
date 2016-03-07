# == Schema Information
#
# Table name: ingress_user_completed_missions
#
#  id           :integer          not null, primary key
#  user_id      :integer
#  community_id :integer
#

module Ingress
  class UserCompletedMission < ActiveRecord::Base
    belongs_to :user,    class_name: 'User'
    belongs_to :mission, class_name: 'Ingress::Mission'
  end
end
