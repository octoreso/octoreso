module Ingress
  class MissionsController < ApplicationController
    respond_to :json

    def index
      @missions = Ingress::Mission.all.includes(:mission_series, :agent, :points)

      respond_with @missions
    end

    def show
      @mission = Ingress::Mission.find(params[:id])
    end
  end
end
