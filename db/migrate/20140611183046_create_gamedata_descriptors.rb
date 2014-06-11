class CreateGamedataDescriptors < ActiveRecord::Migration
  def change
    create_table :gamedata_descriptors do |t|
      t.string :name

      t.timestamps
    end
  end
end
