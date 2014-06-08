class AddModeToGamedataRecipeResource < ActiveRecord::Migration
  def change
    add_column :gamedata_recipe_resources, :recipe_resource_mode_id, :integer
  end
end
