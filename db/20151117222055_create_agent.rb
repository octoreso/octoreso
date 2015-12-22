class CreateAgent < ActiveRecord::Migration
  def change
    create_table :ingress_agents do |t|
      t.string :name, null: false
      t.timestamps
    end
  end
end
