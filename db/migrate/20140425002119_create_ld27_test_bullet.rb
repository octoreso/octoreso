class CreateLd27TestBullet < ActiveRecord::Migration
  def change
    create_table :ld27_test_bullets do |t|
      t.decimal :x
      t.decimal :y
      t.decimal :rot
      t.decimal :velocityX
      t.decimal :velocityY
      t.integer :player_id
      t.timestamps
    end
  end
end
