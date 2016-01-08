# == Schema Information
#
# Table name: ingress_points
#
#  id          :integer          not null, primary key
#  lat         :decimal(9, 6)    not null
#  long        :decimal(9, 6)    not null
#  portal_name :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Ingress::Point, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
