# == Schema Information
#
# Table name: ingress_mission_points
#
#  id          :integer          not null, primary key
#  mission_id  :integer
#  point_id    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  action_type :integer
#

module Ingress
  class MissionPoint < ActiveRecord::Base
    belongs_to :mission,   inverse_of: :mission_points
    belongs_to :point,     inverse_of: :mission_points

    before_destroy :destroy_orphaned_points

    enum action_type: {
      action_type_null:            0,
      action_type_hack:            1,
      action_type_capture_upgrade: 2,
      action_type_link:            3,
      action_type_field:           4,
      action_type_mod:             5,
      action_type_unknown1:        6,
      action_type_waypoint:        7,
      action_type_password:        8,
    }

    def action_icon
      ActionController::Base.helpers.asset_url("action_type/#{action_type.gsub('action_type_', '')}.svg")
    end

    private

    def destroy_orphaned_points
      remaining_missions = point.mission_points.reject { |mp| mp.id == self.id }

      point.destroy! unless remaining_missions.present?
    end
  end
end
