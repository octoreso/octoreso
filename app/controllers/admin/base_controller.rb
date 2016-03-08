module Admin
  class BaseController < ApplicationController
    layout 'admin'

    check_authorization
  end
end
