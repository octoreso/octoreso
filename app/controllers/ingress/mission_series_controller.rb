# == Schema Information
#
# Table name: ingress_mission_series
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  created_at   :datetime
#  updated_at   :datetime
#  community_id :integer
#  min_lat      :decimal(9, 6)
#  min_long     :decimal(9, 6)
#  max_lat      :decimal(9, 6)
#  max_long     :decimal(9, 6)
#

module Ingress
  class MissionSeriesController < ApplicationController
    respond_to :json

    def index
      south = params[:south] || -90
      north = params[:north] || 90
      west  = params[:west] || -180
      east  = params[:east] || 180

      @mission_series_collection = Ingress::MissionSeries.includes(:community, missions: { mission_points: :point })
        .for_coords(n: north, e: east, s: south, w: west)
        .page(1)
        .sort_by(&:name)

      respond_with @mission_series_collection
    end

    def show
      @mission_series = Ingress::MissionSeries.where(id: params[:id]).includes(:community, missions: { mission_points: :point })
      @mission_series = @mission_series.first

      @checked_missions = Ingress::UserCompletedMission.where(user: current_user, mission: @mission_series.missions.map(&:id))
        .group_by(&:mission_id)

      respond_with @mission_series
    end
  end
end
