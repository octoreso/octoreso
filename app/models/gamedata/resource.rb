class Gamedata::Resource < ActiveRecord::Base
  belongs_to :game, inverse_of: :resources, class_name: '::Gamedata::Game'

  has_many :recipe_resources, inverse_of: :resource, class_name: '::Gamedata::RecipeResource'

  validates :game, presence: true
  validates :name, presence: true

  def to_s
    name
  end
  
  rails_admin do 
    [list, edit].each do 
      field :game
      field :name
      field :source_url
    end
  end
end
