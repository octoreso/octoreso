class CreateIngressUserCompletedMissions < ActiveRecord::Migration
  def change
    create_table :ingress_user_completed_missions do |t|
      t.references :user,    index: true
      t.references :mission, index: true
      t.timestamps
    end
  end
end
