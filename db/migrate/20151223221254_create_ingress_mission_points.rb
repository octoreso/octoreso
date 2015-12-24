class CreateIngressMissionPoints < ActiveRecord::Migration
  def change
    create_table :ingress_mission_points do |t|
      t.references :mission
      t.references :point

      t.timestamps null: false
    end
  end
end
