# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :gamedata_recipe_resource, :class => 'Gamedata::RecipeResource' do
    recipe_id 1
    resource_id 1
    game_id 1
  end
end
