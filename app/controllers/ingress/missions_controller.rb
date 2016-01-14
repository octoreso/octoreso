module Ingress
  class MissionsController < ApplicationController
    respond_to :json

    def index
      south = params[:south] || -90
      north = params[:north] || 90
      west  = params[:west] || -180
      east  = params[:east] || 180

      @missions = Ingress::Mission.all.includes(:mission_series, :agent, :points)
        .where.not('min_lat > ?', north)
        .where.not('max_lat < ?',  south)
        .where.not('min_long > ?', east)
        .where.not('max_long < ?', west)
        .order(:name)

      respond_with @missions
    end

    def show
      @mission = Ingress::Mission.where(id: params[:id]).includes(:mission_series, :agent, :points)

      respond_with @mission.first
    end
  end
end
