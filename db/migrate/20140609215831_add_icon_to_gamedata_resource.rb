class AddIconToGamedataResource < ActiveRecord::Migration
  def change
    add_attachment :gamedata_resources, :icon
  end
end
