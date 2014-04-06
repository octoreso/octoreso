class Post < ActiveRecord::Base
  belongs_to :category, inverse_of: :posts
end
