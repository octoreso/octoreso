class CreateGamedataResourceDescriptors < ActiveRecord::Migration
  def change
    create_table :gamedata_resource_descriptors do |t|
      t.integer :resource_id, null: false, index: true
      t.integer :descriptor_id, null: false, index: true

      t.timestamps
    end
  end
end
