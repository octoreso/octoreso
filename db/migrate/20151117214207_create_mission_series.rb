class CreateMissionSeries < ActiveRecord::Migration
  def change
    create_table :ingress_mission_series do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
