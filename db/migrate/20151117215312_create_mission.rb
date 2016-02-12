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

      t.timestamps
      # UNIQUE: mission_series, series_index
    end
  end
end
