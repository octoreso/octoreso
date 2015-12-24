class CreateIngressPoints < ActiveRecord::Migration
  def change
    create_table :ingress_points do |t|
      t.decimal :lat,        null: false, scale: 6, precision: 9
      t.decimal :long,       null: false, scale: 6, precision: 9
      t.string :portal_name, null: true, default: nil

      t.timestamps null: false
    end
  end
end
