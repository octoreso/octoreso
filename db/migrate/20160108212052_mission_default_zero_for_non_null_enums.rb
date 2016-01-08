class MissionDefaultZeroForNonNullEnums < ActiveRecord::Migration
  def change
    change_table :ingress_missions do |t|
      t.change :difficulty_type         , :integer, null: false, default: 0
      t.change :field_trip_waypoint_type, :integer, null: false, default: 0
    end

  end
end
