# == Schema Information
#
# Table name: ingress_communities
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  min_lat    :decimal(9, 6)
#  min_long   :decimal(9, 6)
#  max_lat    :decimal(9, 6)
#  max_long   :decimal(9, 6)
#

module Ingress
  class CommunitiesController < ApplicationController
    respond_to :json

    def index
      south = params[:south] || -90
      north = params[:north] || 90
      west  = params[:west] || -180
      east  = params[:east] || 180

      @communities = Ingress::Community.all.includes(:mission_series)
        .where.not('min_lat > ?', north)
        .where.not('max_lat < ?',  south)
        .where.not('min_long > ?', east)
        .where.not('max_long < ?', west)
        .order(:name)

      respond_with @communities
    end

    def show
      @community = Ingress::Community.where(id: params[:id]).includes(:mission_series)
      @community = @community.first

      respond_with @community
    end
  end
end
