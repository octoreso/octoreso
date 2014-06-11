class Gamedata::Descriptor < ActiveRecord::Base
  has_many :resource_descriptors, inverse_of: :descriptor, class_name: '::Gamedata::ResourceDescriptor'

  def to_s
    name
  end
  
  rails_admin do 
    [list, edit].each do 
      field :name
    end
  end
end
