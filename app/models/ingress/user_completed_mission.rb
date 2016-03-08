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

module Ingress
  class UserCompletedMission < ActiveRecord::Base
    belongs_to :user,    class_name: 'User'            , inverse_of: :user_completed_missions
    belongs_to :mission, class_name: 'Ingress::Mission', inverse_of: :user_completed_missions
  end
end
