require 'csv'

namespace :community do
  task add: :environment do
    raise 'Set community with COMMUNITY=name' unless ENV['COMMUNITY'].present?
    community = Ingress::Community.find_by(name: ENV['COMMUNITY'])
    raise "Community already exists: [#{ENV['COMMUNITY']}]" if community.present?

    file = Rails.root.join('db', 'seeds', 'ingress', 'missions', "#{ENV['COMMUNITY']}.csv")
    puts "* #{file} added"

    Ingress::Community.transaction do
      file = File.read(file)
      CSV.parse(file, headers: true).each do |row|
        Ingress::Mission.create_from_csv!(row.to_h, community_name: ENV['COMMUNITY'])
      end
    end
  end

  task remove: :environment do
    community = Ingress::Community.find_by(name: ENV['COMMUNITY'])
    raise "Couldn't find Community: [#{ENV['COMMUNITY']}]" unless community.present?

    Ingress::Community.transaction do
      puts "Deleting #{ENV['COMMUNITY']}"
      community.destroy!

      puts "* #{ENV['COMMUNITY']} deleted."
    end
  end

  task reset: :environment do
    Ingress::Community.transaction do
      Ingress::Community.all.destroy_all

      Dir[Rails.root.join('db', 'seeds', 'ingress', 'missions', '**', '*.csv')].each do |file|
        file_name = file.split('db/seeds/ingress/missions/').last.gsub('.csv', '')
        puts
        puts "* #{file_name}"

        file = File.read(file)
        csv  = CSV.parse(file, headers: true).each do |row|
          Ingress::Mission.create_from_csv!(row.to_h, community_name: file_name)
        end
      end
    end
  end

end
