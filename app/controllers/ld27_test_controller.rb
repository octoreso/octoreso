class Ld27TestController < ApplicationController
  def index
   
  end

  def data
    player = Ld27TestPlayer.update_tick(params, current_user)
  
    response            = {}
    response[:ping]     = true
    response[:username] = params['username'].to_s
    response[:player]   = player
    response[:players]  = Ld27TestPlayer.get_active(current_user)

    render json: response
  end


end
