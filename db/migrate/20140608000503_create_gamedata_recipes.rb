class CreateGamedataRecipes < ActiveRecord::Migration
  def change
    create_table :gamedata_recipes do |t|
      t.integer :game_id

      t.timestamps
    end
  end
end
