class Gamedata::Recipe < ActiveRecord::Base
  belongs_to :game, inverse_of: :recipes, class_name: '::Gamedata::Game'
  has_many :recipe_resources, inverse_of: :recipe, class_name: '::Gamedata::RecipeResource'

  accepts_nested_attributes_for :recipe_resources, allow_destroy: true

  default_scope { order(:name) }

  validates :game, presence: true
  validates :name, presence: true
  validates_associated :recipe_resources

  def to_s
    name
  end

  rails_admin do 
    [list, edit].each do 
      field :game
      field :name
      field :recipe_resources 
    end
  end
end
