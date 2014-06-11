# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :gamedata_resource_descriptor, :class => 'Gamedata::ResourceDescriptor' do
    resource nil
    descriptor nil
  end
end
