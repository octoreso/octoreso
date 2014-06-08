class CreateGamedataRecipeResources < ActiveRecord::Migration
  def change
    create_table :gamedata_recipe_resources do |t|
      t.integer :recipe_id
      t.integer :resource_id
      t.integer :quantity

      t.timestamps
    end
  end
end
