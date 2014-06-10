class Gamedata::ResourcesController < ApplicationController
  def index
    @resources = Gamedata::Resource.where(game_id: 1)
  end

  def show
    @resource = Gamedata::Resource.where(game_id: 1).find(params[:id])

    recipe_items = Gamedata::RecipeResource.includes(:mode, recipe: :recipe_resources).where(game_id: 1, resource: @resource)

    @inputs  = recipe_items.select { |x| x.mode.name == 'In'  }.map(&:recipe)
    @outputs = recipe_items.select { |x| x.mode.name == 'Out' }.map(&:recipe)
  end
end