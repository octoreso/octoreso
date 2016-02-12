class AddLatLongCaches < ActiveRecord::Migration
  def change
    change_table :ingress_mission_series do |t|
      t.decimal :min_lat,  null: true, default: nil, scale: 6, precision: 9
      t.decimal :min_long, null: true, default: nil, scale: 6, precision: 9
      t.decimal :max_lat,  null: true, default: nil, scale: 6, precision: 9
      t.decimal :max_long, null: true, default: nil, scale: 6, precision: 9
    end

    change_table :ingress_missions do |t|
      t.decimal :min_lat,  null: true, default: nil, scale: 6, precision: 9
      t.decimal :min_long, null: true, default: nil, scale: 6, precision: 9
      t.decimal :max_lat,  null: true, default: nil, scale: 6, precision: 9
      t.decimal :max_long, null: true, default: nil, scale: 6, precision: 9
    end

    change_table :ingress_communities do |t|
      t.decimal :min_lat,  null: true, default: nil, scale: 6, precision: 9
      t.decimal :min_long, null: true, default: nil, scale: 6, precision: 9
      t.decimal :max_lat,  null: true, default: nil, scale: 6, precision: 9
      t.decimal :max_long, null: true, default: nil, scale: 6, precision: 9
    end
  end
end
