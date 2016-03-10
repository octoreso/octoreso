class ChangeIngressMissionColumnsToNullable2 < ActiveRecord::Migration
  def change
    change_column_default :ingress_missions, :sequence_type, 0
    change_column_default :ingress_missions, :series_type, 0
  end
end
