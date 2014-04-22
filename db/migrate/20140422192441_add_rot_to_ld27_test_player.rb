class AddRotToLd27TestPlayer < ActiveRecord::Migration
  def change
    add_column :ld27_test_players, :rot, :decimal
  end
end
