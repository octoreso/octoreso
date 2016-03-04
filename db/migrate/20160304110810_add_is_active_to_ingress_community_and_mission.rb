class AddIsActiveToIngressCommunityAndMission < ActiveRecord::Migration
  def change
    add_column :ingress_communities, :is_active, :boolean, default: false, null: false
    add_column :ingress_missions,    :is_active, :boolean, default: false, null: false
  end
end
