task list_users: :environment do
  User.all.each do |user|
    puts "ID: #{user.id}\tEmail: #{user.email}\tRole: #{user.roles}"
  end
end
