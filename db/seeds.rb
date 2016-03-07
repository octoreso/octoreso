# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

require 'csv'

# Add admin user
pass = Devise.friendly_token[0, 20]

User.create!(
  email:                 ENV['ADMIN_EMAIL'],
  password:              pass,
  password_confirmation: pass,
  provider:              "google_oauth2",
  google_uid:            ENV['ADMIN_GOOGLE_UID'],
  google_plus_link:      ENV['ADMIN_GOOGLE_PLUS_URL'],
  roles:                 User::ROLE_ADMIN
)

require Rails.root.join('db', 'seeds', 'ingress', 'communities.rb')

Dir[Rails.root.join('db', 'seeds', 'ingress', 'missions', '**', '*.csv')].each do |file|
  file_name = file.split('db/seeds/ingress/missions/').last.gsub('.csv', '')
  puts
  puts "* #{file_name}"

  file = File.read(file)
  csv  = CSV.parse(file, headers: true).each do |row|
    Ingress::Mission.create_from_csv!(row.to_h, community_name: file_name)
  end
end
