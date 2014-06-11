class DropLd27Tables < ActiveRecord::Migration
  def change
    drop_table :ld27_test_players
    drop_table :ld27_test_bullets
  end
end
