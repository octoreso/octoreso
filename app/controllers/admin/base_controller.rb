module Admin
  class BaseController < ApplicationController
    layout 'admin'

    check_authorization

    rescue_from CanCan::AccessDenied do |exception|
      redirect_to root_url(subdomain: '')
    end
  end
end
