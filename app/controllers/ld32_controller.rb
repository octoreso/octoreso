class Ld32Controller < ApplicationController
  after_action :allow_iframe, only: :index

  after_action :allow_iframe, only: :index

  def index
    render 'index', layout: false
  end

  def redirect
    redirect_to 'http://ludumdare.com/compo/ludum-dare-32/?action=preview&uid=4783'
  end

  private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end
