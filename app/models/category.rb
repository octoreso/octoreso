class Category < ActiveRecord::Base
  has_many :posts, inverse_of: :category
end
