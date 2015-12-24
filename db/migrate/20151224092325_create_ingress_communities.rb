class CreateIngressCommunities < ActiveRecord::Migration
  def change
    create_table :ingress_communities do |t|
      t.string :name

      t.timestamps null: false
    end

    change_table :ingress_missions do |t|
      t.references :community, null: true, default: nil
    end

    change_table :ingress_mission_series do |t|
      t.references :community, null: true, default: nil
    end
  end
end
