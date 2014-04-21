class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:steam]
  has_one :ld27_test_player, inverse_of: :user

  def self.find_for_steam_oauth(auth)
    where(auth.slice(:provider, :uid)).first_or_create! do |user|
      user.provider = auth.provider
      user.uid      = auth.uid
      user.roles    = auth.uid == ENV['ADMIN_STEAM_UID'] ? [Role.find_by(name: 'Admin')] : [Role.find_by(name: 'User')]
      user.email    = "#{auth.uid}@steamcommunity.com"
      user.password = Devise.friendly_token[0,20]
      user.name     = auth.info.name   # assuming the user model has a name
      user.image    = auth.info.image # assuming the user model has an image
    end
  end

  def self.create_guest
    r1 = Devise.friendly_token
    r2 = Devise.friendly_token
    user = User.new
    user.provider = 'guest'
    user.uid      = "#{r1}"   
    user.name     = "Guest #{r1[15,20]}"
    user.email    = "#{r1}@random.org"
    user.password = "#{r2}"
    user.roles    = []
    user.save!
    user 
  end
end
