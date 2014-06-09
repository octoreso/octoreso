class Gamedata::Resource < ActiveRecord::Base
  belongs_to :game, inverse_of: :resources, class_name: '::Gamedata::Game'

  has_many :recipe_resources, inverse_of: :resource, class_name: '::Gamedata::RecipeResource'

  validates :game, presence: true
  validates :name, presence: true

  has_attached_file :icon,
    styles: {
      mini:   ['16x16#',   :png],
      tiny:   ['32x32#',   :png],
      small:  ['64x64#',   :png],
      medium: ['128x128#', :png],
      large:  ['256x256#', :png] 
    }
  validates_attachment_content_type :icon, :content_type => /\Aimage\/.*\Z/
  attr_accessor :delete_icon
  before_validation { self.icon.clear if self.delete_icon == '1' }

  def to_s
    name
  end
  
  rails_admin do 
    [list, edit].each do 
      field :game
      field :name
      field :source_url
      field :icon
    end
  end
end
