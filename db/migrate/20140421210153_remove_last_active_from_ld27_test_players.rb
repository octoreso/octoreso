class RemoveLastActiveFromLd27TestPlayers < ActiveRecord::Migration
  def up
    remove_column :ld27_test_players, :last_active
  end

  def down
    raise 'Good Luck lololol'
  end
end
