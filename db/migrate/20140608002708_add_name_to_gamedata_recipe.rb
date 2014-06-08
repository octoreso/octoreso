class AddNameToGamedataRecipe < ActiveRecord::Migration
  def change
    add_column :gamedata_recipes, :name, :string
  end
end
