# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :post do
    title "MyString"
    subtitle "MyString"
    category nil
    content "MyText"
  end
end
