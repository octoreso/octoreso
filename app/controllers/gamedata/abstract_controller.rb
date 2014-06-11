class Gamedata::AbstractController < ApplicationController
  layout :load_layout

  def load_layout
    'warframe'
  end
end
