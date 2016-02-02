# == Schema Information
#
# Table name: ingress_missions
#
#  id                       :integer          not null, primary key
#  name                     :string           not null
#  agent_id                 :integer          not null
#  mission_url              :string           not null
#  sequence_type            :integer          not null
#  series_type              :integer          not null
#  mission_series_id        :integer
#  series_index             :integer
#  difficulty_type          :integer          default(0), not null
#  field_trip_waypoint_type :integer          default(0), not null
#  field_trip_waypoint_qty  :integer          default(0), not null
#  passphrase_type          :integer          not null
#  created_at               :datetime
#  updated_at               :datetime
#  community_id             :integer
#  validation_level         :integer          default(0), not null
#  min_lat                  :decimal(9, 6)
#  min_long                 :decimal(9, 6)
#  max_lat                  :decimal(9, 6)
#  max_long                 :decimal(9, 6)
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
        .where.not('min_lat > ?', north)
        .where.not('max_lat < ?',  south)
        .where.not('min_long > ?', east)
        .where.not('max_long < ?', west)
        .order(:name)

      respond_with @missions
    end

    def show
      @mission = Ingress::Mission.where(id: params[:id]).includes(:mission_series, :agent, mission_points: :point)

      respond_with @mission.first
    end
  end
end
