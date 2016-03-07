# == Schema Information
#
# Table name: ingress_missions
#
#  id                :integer          not null, primary key
#  name              :string           default(""), not null
#  agent_id          :integer
#  mission_url       :string           default(""), not null
#  sequence_type     :integer
#  series_type       :integer
#  hidden_points     :integer          default(0), not null
#  mission_series_id :integer
#  series_index      :integer
#  created_at        :datetime
#  updated_at        :datetime
#  community_id      :integer
#  validation_level  :integer          default(0), not null
#  min_lat           :decimal(9, 6)
#  min_long          :decimal(9, 6)
#  max_lat           :decimal(9, 6)
#  max_long          :decimal(9, 6)
#  is_active         :boolean          default(FALSE), not null
#

module Ingress
  class MissionsController < ApplicationController
    respond_to :json

    def index
      south = params[:south] || -90
      north = params[:north] || 90
      west  = params[:west] || -180
      east  = params[:east] || 180

      @missions = Ingress::Mission.all.includes(:mission_series, :agent, mission_points: :point)
        .for_coords(n: north, e: east, s: south, w: west)
        .page(1)
        .sort_by(&:name)

      respond_with @missions
    end

    def show
      @mission = Ingress::Mission.where(id: params[:id]).includes(:mission_series, :agent, mission_points: :point)
      @mission = @mission.first

      respond_with @mission
    end
  end
end
