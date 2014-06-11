class Gamedata::ResourceDescriptor < ActiveRecord::Base
  belongs_to :resource, inverse_of: :resource_descriptors, class_name: '::Gamedata::Resource'
  belongs_to :descriptor, inverse_of: :resource_descriptors, class_name: '::Gamedata::Descriptor'

  def to_s
    "#{resource}: #{descriptor}"
  end
  
  rails_admin do 
    [list, edit].each do 
      field :resource
      field :descriptor
    end
  end
end
