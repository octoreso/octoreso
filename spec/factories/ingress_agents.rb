# == Schema Information
#
# Table name: ingress_agents
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

FactoryGirl.define do
  factory :ingress_agent, :class => 'Ingress::Agent' do
    
  end

end
