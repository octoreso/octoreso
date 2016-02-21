class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def self.default_url_options
    { locale: I18n.locale }
  end
end
