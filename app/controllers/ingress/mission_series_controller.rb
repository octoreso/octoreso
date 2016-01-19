module Ingress
  class MissionSeriesController < ApplicationController
    respond_to :json

    def index
      south = params[:south] || -90
      north = params[:north] || 90
      west  = params[:west] || -180
      east  = params[:east] || 180

      @mission_series_collection = Ingress::MissionSeries.includes(:community, missions: :points)
        .where.not('min_lat > ?', north)
        .where.not('max_lat < ?',  south)
        .where.not('min_long > ?', east)
        .where.not('max_long < ?', west)
        .order(:name)

      respond_with @mission_series_collection
    end

    def show
      @mission_series = Ingress::MissionSeries.where(id: params[:id]).includes(:community, missions: :points)
      respond_with @mission_series.first
    end
  end
end
