class CreateMission < ActiveRecord::Migration
  def change
    create_table :ingress_missions do |t|
      t.string :name, null: false, default: ''
      t.references :agent, null: true, default: nil
      t.string :mission_url, null: false, default: ''
      t.integer :sequence_type, null: true, default: nil
      t.integer :series_type, null: true, default: nil
      t.integer :hidden_points, null: false, default: 0
      t.references :mission_series, null: true, default: nil
      t.integer :series_index, null: true, default: nil

      t.timestamps
      # UNIQUE: mission_series, series_index
    end
  end
end
