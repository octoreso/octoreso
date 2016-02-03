class DropSuperfluousFields < ActiveRecord::Migration
  def change
    change_table :ingress_points do |t|
      t.remove :portal_name
    end

    change_table :ingress_missions do |t|
      t.remove :field_trip_waypoint_type
      t.remove :field_trip_waypoint_qty
      t.remove :passphrase_type
      t.remove :difficulty_type
    end
  end
end
