class Ld27TestPlayer < ActiveRecord::Base
  belongs_to :user, inverse_of: :ld27_test_player
  has_many :bullet, class_name: 'Ld27TestBullet', inverse_of: :player
  validates :user, presence: :true

  def uid
    user.uid
  end

  def name
    user.name
  end

  def self.update_tick(params, user)
    player = Ld27TestPlayer.where(user: user).first_or_create! do |p| 
      p.user         = user      
    end

    player.HP           = params['ship']['HP'].to_f
    player.HPmax        = params['ship']['HPmax'].to_f
    player.x            = params['ship']['x'].to_f
    player.y            = params['ship']['y'].to_f
    player.rot          = params['ship']['rot'].to_f
    player.velocityX    = params['ship']['velocityX'].to_f
    player.velocityY    = params['ship']['velocityY'].to_f
    player.save!

    player.slice(*client_params)
  end

  def self.get_active(user)
    players = Ld27TestPlayer.where('updated_at > ?',  Time.now - 60.seconds).where('user_id != ?', user.id)
    players.map do |player|
      player.slice(*client_params)
    end
  end

  private

  def self.client_params 
    ['uid', 'name', 'HP', 'HPmax', 'x', 'y', 'rot', 'velocityX', 'velocityY']
  end
end
