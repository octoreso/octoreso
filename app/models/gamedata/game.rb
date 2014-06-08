class Gamedata::Game < ActiveRecord::Base
  has_many :resources, inverse_of: :game, class_name: '::Gamedata::Resource'
  has_many :recipes,   inverse_of: :game, class_name: '::Gamedata::Recipe'
  
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
