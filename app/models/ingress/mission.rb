# == Schema Information
#
# Table name: ingress_missions
#
#  id                       :integer          not null, primary key
#  name                     :string           not null
#  agent_id                 :integer          not null
#  mission_url              :string           not null
#  sequence_type            :integer          not null
#  series_type              :integer          not null
#  mission_series_id        :integer
#  series_index             :integer
#  difficulty_type          :integer          not null
#  field_trip_waypoint_type :integer          not null
#  field_trip_waypoint_qty  :integer          default(0), not null
#  passphrase_type          :integer          not null
#  created_at               :datetime
#  updated_at               :datetime
#

module Ingress
  class Mission < ActiveRecord::Base
    belongs_to :agent, inverse_of: :missions
    belongs_to :mission_series, inverse_of: :missions

    validates :name, presence: true
    validates :agent_id, presence: true
    validates :mission_url, presence: true, uniqueness: true
    validates :sequence_type, presence: true
    validates :difficulty_type, presence: true
    validates :field_trip_waypoint_type, presence: true
    validates :field_trip_waypoint_qty, presence: true
    validates :passphrase_type, presence: true

  end
end
