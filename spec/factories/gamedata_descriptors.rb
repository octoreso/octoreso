# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :gamedata_descriptor, :class => 'Gamedata::Descriptor' do
    name "MyString"
  end
end
