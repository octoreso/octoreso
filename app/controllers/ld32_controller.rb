class Ld32Controller < ApplicationController
  after_action :allow_iframe, only: :index

  after_action :allow_iframe, only: :index

  def index
    render 'index', layout: false
  end

  private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end
