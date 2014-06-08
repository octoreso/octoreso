class CreateGamedataRecipeResourceModes < ActiveRecord::Migration
  def change
    create_table :gamedata_recipe_resource_modes do |t|
      t.string :name

      t.timestamps
    end
  end
end
