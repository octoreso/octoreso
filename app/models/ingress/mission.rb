# == Schema Information
#
# Table name: ingress_missions
#
#  id                :integer          not null, primary key
#  name              :string           not null
#  agent_id          :integer          not null
#  mission_url       :string           not null
#  sequence_type     :integer          not null
#  series_type       :integer          not null
#  mission_series_id :integer
#  series_index      :integer
#  created_at        :datetime
#  updated_at        :datetime
#  community_id      :integer
#  validation_level  :integer          default(0), not null
#  min_lat           :decimal(9, 6)
#  min_long          :decimal(9, 6)
#  max_lat           :decimal(9, 6)
#  max_long          :decimal(9, 6)
#

module Ingress
  class Mission < ActiveRecord::Base
    include Import::Mission

    attr_accessor :from_csv_import
    attr_accessor :trace_urls
    attr_accessor :intel_json
    attr_accessor :updating_range

    after_save :update_range

    belongs_to :community,      inverse_of: :missions
    belongs_to :agent,          inverse_of: :missions
    belongs_to :mission_series, inverse_of: :missions

    has_many :mission_points, inverse_of: :mission

    has_many :points, through: :mission_points, inverse_of: :missions

    validates :name,                     presence: true
    validates :agent_id,                 presence: true
    validates :mission_url,              presence: true, uniqueness: true
    validates :sequence_type,            presence: true
    validates :series_type,              presence: true

    enum sequence_type: {
      sequence_type_sequential:        1,
      sequence_type_any_order:         2,
      sequence_type_sequential_hidden: 3
    }

    enum series_type: {
      series_type_solo:     1,
      series_type_sequence: 2,
      series_type_banner:   3
    }

    # TODO: difficulty_type as bitmask, reassigning 17/18 manually?
    def as_json(options = {})
      super(options.merge(include: [:mission_series, :agent, mission_points: { methods: :action_icon, include: :point }]))
    end

    def update_range
      return if updating_range
      return if mission_points.blank?

      mission_points.each do |mission_point|
        point = mission_point.point

        if self.min_lat.nil?
          self.min_lat = point.lat
          self.max_lat = point.lat
          self.min_long = point.long
          self.max_long = point.long
        else
          self.min_lat = [self.min_lat, point.lat].min unless point.lat.nil?
          self.max_lat = [self.max_lat, point.lat].max unless point.lat.nil?
          self.min_long = [self.min_long, point.long].min unless point.long.nil?
          self.max_long = [self.max_long, point.long].max unless point.long.nil?
        end
      end

      self.updating_range = true

      print '.'
      save!
      # Save
      mission_series.try(:update_range)
    end
  end
end
