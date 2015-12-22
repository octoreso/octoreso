# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  created_at             :datetime
#  updated_at             :datetime
#  name                   :string
#  provider               :string
#  uid                    :string
#  image                  :string
#

class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:steam]

  # As yet unsure why this is tripping the duped HABTM issue, think it's rolify's fault.
  # We'll be redoing auth/perms anyway, I'm unhappy with CanCan and the Oauth needs swapping for Google.

  # has_and_belongs_to_many :roles, join_table: :users_roles, inverse_of: :users

  def self.find_for_steam_oauth(auth)
    where(provider: auth[:provider], uid: auth[:uid]).first_or_create! do |user|
      user.provider = auth.provider
      user.uid      = auth.uid
      user.roles    = auth.uid == ENV['ADMIN_STEAM_UID'] ? [Role.find_by(name: 'admin')] : [Role.find_by(name: 'user')]
      user.email    = "#{auth.uid}@steamcommunity.com"
      user.password = Devise.friendly_token[0,20]
      user.name     = auth.info.name   # assuming the user model has a name
      user.image    = auth.info.image # assuming the user model has an image
    end
  end

  def self.create_guest
    fail 'No longer accepting Guest Accounts.'
    # r1 = Devise.friendly_token
    # r2 = Devise.friendly_token
    # user = User.new
    # user.provider = 'guest'
    # user.uid      = "#{r1}"
    # user.name     = "Guest #{r1[15,20]}"
    # user.email    = "#{r1}@random.org"
    # user.password = "#{r2}"
    # user.roles    = []
    # user.save!
    # user
  end
end
