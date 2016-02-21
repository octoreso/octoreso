object @mission_series
attributes :id,
  :name,
  :community_id,
  :min_lat,
  :min_long,
  :max_lat,
  :max_long

child community: :community do
  attributes :id,
    :name,
    :min_lat,
    :min_long,
    :max_lat,
    :max_long
end

child missions: :missions do
  attributes :id,
    :name,
    :agent_id,
    :mission_url,
    :sequence_type,
    :series_type,
    :hidden_points,
    :mission_series_id,
    :series_index,
    :community_id,
    :validation_level,
    :min_lat,
    :min_long,
    :max_lat,
    :max_long

  child mission_points: :mission_points do
    attributes :id,
      :mission_id,
      :point_id,
      :action_type,
      :action_icon

    child :point do
      attributes :id,
        :lat,
        :long
    end
  end
end
