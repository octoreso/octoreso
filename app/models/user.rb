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
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  provider               :string
#  google_uid             :string
#  google_plus_link       :string
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :trackable, :omniauthable, omniauth_providers: [:google_oauth2]
  # :registerable,
  # :recoverable, :rememberable, , :validatable,

  has_many :user_communities, class_name: 'Ingress::UserCommunity', inverse_of: :user

  has_many :communities, through: :user_communities, class_name: 'Ingress::Community'

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
