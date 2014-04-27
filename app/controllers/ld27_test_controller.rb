class Ld27TestController < ApplicationController
  def index
   
  end

  def data
    player_data = Ld27TestPlayer.update_tick(params, current_user)
    player = current_user.ld27_test_player
    Ld27TestBullet.update_tick(params, player)

    response            = {}
    response[:ping]     = true
    response[:username] = params['username'].to_s
    response[:player]   = player_data
    response[:players]  = Ld27TestPlayer.get_active(current_user)
    response[:bullets]  = Ld27TestBullet.get_active(player) 

    render json: response
  end
end
