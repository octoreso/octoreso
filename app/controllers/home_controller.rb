class HomeController < ApplicationController
  def index
    redirect_to subdomain: :ingress
  end
end
