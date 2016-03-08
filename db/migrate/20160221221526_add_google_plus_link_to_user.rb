class AddGooglePlusLinkToUser < ActiveRecord::Migration
  def change
    add_column :users, :google_plus_link, :string
  end
end
