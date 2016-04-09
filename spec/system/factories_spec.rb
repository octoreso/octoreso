require 'rails_helper'

RSpec.describe FactoryGirl, type: :model do
  it 'Lints successfully' do
    FactoryGirl.lint traits: true
  end
end
