class AddTimestampsToLd27TestPlayer < ActiveRecord::Migration
  def change
    change_table :ld27_test_players do |t|
      t.timestamps
    end
  end
end
