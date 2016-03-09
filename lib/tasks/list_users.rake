require 'csv'

task list_users: :environment do
  User.all.each do |user|
    puts "ID: #{user.id}\tEmail: #{user.email}\tRole: #{user.roles}"
  end
end

task fix_users: :environment do
  User.find_by(name: 'gigitrix@gmail.com').update_attributes!(roles: 1)
end
