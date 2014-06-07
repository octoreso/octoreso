class CreateGamedataGames < ActiveRecord::Migration
  def change
    create_table :gamedata_games do |t|
      t.string :name

      t.timestamps
    end
  end
end
