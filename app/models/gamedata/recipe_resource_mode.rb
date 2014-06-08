class Gamedata::RecipeResourceMode < ActiveRecord::Base
  belongs_to :recipe_resources, inverse_of: :mode, class_name: '::Gamedata::RecipeResource' 

  validates :name, presence: true

  def to_s
    name
  end

  rails_admin do 
    [list, edit].each do 
      field :name
    end
  end 
end
