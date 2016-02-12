# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# Environment variables (ENV['...']) can be set in the file config/application.yml.
# See http://railsapps.github.io/rails-environment-variables.html

require 'csv'
# file = File.read(Rails.root.join('db', 'seeds', 'missions.csv'))

Dir[Rails.root.join('db', 'seeds', 'ingress', 'missions', '**', '*.csv')].each do |file|
  file_name = file.split('db/seeds/ingress/missions/').last.gsub('.csv', '')
  puts
  puts "* #{file_name}"

  file = File.read(file)
  csv  = CSV.parse(file, headers: true).each do |row|
    Ingress::Mission.create_from_csv!(row.to_h, community_name: file_name)
  end
end
