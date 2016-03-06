class CreateIngressUserCommunity < ActiveRecord::Migration
  def change
    create_table :ingress_user_communities do |t|
      t.references :user,      index: true
      t.references :community, index: true
    end
  end
end
