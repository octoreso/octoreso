class Ld27TestBullet < ActiveRecord::Base
  belongs_to :player, class_name: 'Ld27TestPlayer', inverse_of: :bullet

  # validates :player_id, presence: true # efficiency

  def self.get_active(player)
    bullets = Ld27TestBullet.where('created_at > ?', 5.seconds.ago).where('player_id != ?', player.id)
    bullets.map do |bullet|
      data = [] 

      data = bullet.slice(*client_params)
      
      data['x'] = bullet.positionX
      data['y'] = bullet.positionY
      data
    end
  end

  def self.update_tick(params, player)
    if params[:bullets]
      params[:bullets].values.each do |b|
        bullet           = Ld27TestBullet.new
        bullet.x         = b[:x]
        bullet.y         = b[:y]
        bullet.player    = player
        bullet.rot       = b[:rot]
        bullet.velocityX = b[:velocityX]
        bullet.velocityY = b[:velocityY]

        bullet.save!
      end
    end
  end

  # def self.create_from_player(player)
  #   bullet = Ld27TestBullet.new
  #   bullet.x      = player.x
  #   bullet.y      = player.y
  #   bullet.rot    = player.rot
  #   bullet.player = player
  # end

  def delta_time 
    ((Time.now - created_at) / 1000)
  end

  def positionX
    x + (delta_time * velocityX)
  end

  def positionY
    y + (delta_time * velocityY)
  end

  def self.client_params 
    ['id','rot','velocityX','velocityY', 'player_id','created_at']
  end
end