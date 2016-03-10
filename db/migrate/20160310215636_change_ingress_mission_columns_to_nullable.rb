class ChangeIngressMissionColumnsToNullable < ActiveRecord::Migration
  def change
    change_column_null :ingress_missions,    :agent_id, true
    change_column_default :ingress_missions, :agent_id, nil

    change_column_null :ingress_missions,    :mission_series_id, true
    change_column_default :ingress_missions, :mission_series_id, nil
  end
end
