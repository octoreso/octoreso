# == Schema Information
#
# Table name: roles
#
#  id            :integer          not null, primary key
#  name          :string
#  resource_id   :integer
#  resource_type :string
#  created_at    :datetime
#  updated_at    :datetime
#

class Role < ActiveRecord::Base
  has_and_belongs_to_many :users, join_table: :users_roles

  scopify
end
