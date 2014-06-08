# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :gamedata_recipe_resource_mode, :class => 'Gamedata::RecipeResourceMode' do
    name "MyString"
  end
end
