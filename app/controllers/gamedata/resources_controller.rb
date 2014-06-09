class Gamedata::ResourcesController < ApplicationController
  def index
    @resources = Gamedata::Resource.where(game_id: 1)
  end

  def show
    @resource = Gamedata::Resource.where(game_id: 1).find(params[:id])
  end
end
