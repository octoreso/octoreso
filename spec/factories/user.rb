FactoryGirl.define do
  factory :user do
    sequence(:email) { |i| "user_#{i}@testsuite.local" }
    password { Devise.friendly_token[0, 20] }
    password_confirmation { password }
    provider 'test'
    google_uid nil
    google_plus_link nil
    roles User::ROLE_ADMIN
  end
end
