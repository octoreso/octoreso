# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :gamedata_recipe, :class => 'Gamedata::Recipe' do
    game_id 1
  end
end
