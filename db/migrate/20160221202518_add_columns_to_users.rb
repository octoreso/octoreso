class AddColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :provider,   :string
    add_column :users, :google_uid, :string
  end
end
