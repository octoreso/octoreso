class CreateMission < ActiveRecord::Migration
  def change
    create_table :ingress_missions do |t|
      t.string :name, null: false
      t.references :agent, null: false

      t.string :mission_url, null: false
      t.integer :sequence_type, null: false
      t.integer :series_type, null: false
      t.references :mission_series, null: true, default: nil
      t.integer :series_index, null: true, default: nil
      t.integer :difficulty_type, null: false
      t.integer :field_trip_waypoint_type, null: false
      t.integer :field_trip_waypoint_qty, null: false, default: 0
      t.integer :passphrase_type, null: false

      t.timestamps
      # UNIQUE: mission_series, series_index
    end
  end
end
