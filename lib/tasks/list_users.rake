require 'csv'

task list_users: :environment do
  User.all.each do |user|
    puts "ID: #{user.id}\tEmail: #{user.email}\tRole: #{user.roles}"
  end
end

task temp: :environment do
  ::Ingress::Community.create!('uk/darlington')
end
