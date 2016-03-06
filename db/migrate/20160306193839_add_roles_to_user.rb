class AddRolesToUser < ActiveRecord::Migration
  def change
    add_column :users, :roles, :integer, default: 0, null: false
  end
end
