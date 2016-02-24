class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :trackable, :omniauthable, omniauth_providers: [:google_oauth2]
  # :registerable,
  # :recoverable, :rememberable, , :validatable,


  # https://localtest.me:3000/users/auth/google_oauth2
  class << self
    def from_omniauth(auth)
      fail 'Unknown Oauth Provider' unless auth.provider == 'google_oauth2'

      where(provider: auth.provider, google_uid: auth.uid).first_or_create do |user|
        user.provider = auth.provider
        user.google_uid = auth.uid
        user.google_plus_link = auth['extra']['raw_info']['profile']
        user.email = auth.info.email
        user.password = Devise.friendly_token[0, 20]
      end
    end
  end
end
