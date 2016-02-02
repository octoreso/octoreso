class AddActionTypeIdToMissionPoint < ActiveRecord::Migration
  def change
    change_table :ingress_mission_points do |t|
      t.integer :action_type, default: nil, null: true
    end
  end
end
