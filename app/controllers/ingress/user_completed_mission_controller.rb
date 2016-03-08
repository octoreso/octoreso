module Ingress
  class UserCompletedMissionController < ApplicationController
    respond_to :json
    before_action :authenticate_user!

    def check
      id = params[:id].to_i

      UserCompletedMission.where(mission_id: id, user: current_user).first_or_create!

      respond_with({ id: id })
    end

    def uncheck
      id = params[:id].to_i

      UserCompletedMission.where(mission_id: id, user: current_user).first.try(&:destroy!)

      respond_with({ id: id })
    end
  end
end
