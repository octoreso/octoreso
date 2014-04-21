class CreateLd27TestPlayer < ActiveRecord::Migration
  def change
    create_table :ld27_test_players do |t|
      t.references  :user
      t.timestamp   :last_active
      t.decimal     :x
      t.decimal     :y
      t.decimal     :HP
      t.decimal     :HPmax
      t.decimal     :velocityX
      t.decimal     :velocityY
    end
  end
end
