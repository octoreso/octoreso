class AddValidationLevelToIngressMissions < ActiveRecord::Migration
  def change
    add_column :ingress_missions, :validation_level, :integer, default: 0, null: false
  end
end
