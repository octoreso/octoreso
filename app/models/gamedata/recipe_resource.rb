class Gamedata::RecipeResource < ActiveRecord::Base
  belongs_to :recipe,   inverse_of: :recipe_resources, class_name: '::Gamedata::Recipe'
  belongs_to :resource, inverse_of: :recipe_resources, class_name: '::Gamedata::Resource'
  belongs_to :mode,     inverse_of: :recipe_resources, class_name: '::Gamedata::RecipeResourceMode', foreign_key: :recipe_resource_mode_id

  validates :recipe, presence: true
  validates :resource, presence: true
  validates :mode, presence: true
  validates :quantity, presence: true

  def to_s
    "#{mode}: #{quantity} x #{resource}"
  end

  rails_admin do 
    object_label_method :to_s
    [list, edit].each do 
      field :mode
      field :recipe
      field :resource
      field :quantity
    end
  end
end
