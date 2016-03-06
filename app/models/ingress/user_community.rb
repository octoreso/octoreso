module Ingress
  class UserCommunity < ActiveRecord::Base
    belongs_to :user,      class_name: 'User'
    belongs_to :community, class_name: 'Ingress::Community'
  end
end
