class CreateGamedataResources < ActiveRecord::Migration
  def change
    create_table :gamedata_resources do |t|
      t.integer :game_id
      t.string :name
      t.string :source_url

      t.timestamps
    end
  end
end
