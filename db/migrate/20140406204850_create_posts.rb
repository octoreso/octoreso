class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :subtitle
      t.references :category, index: true
      t.text :content

      t.timestamps
    end
  end
end
