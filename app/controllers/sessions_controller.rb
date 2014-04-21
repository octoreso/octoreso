class SessionsController < ApplicationController
  
  def new
    redirect_to '/auth/steam'
  end

  def new_guest
    user =  User.create_guest
    reset_session
    session[:user_id] = user.id
    unless user.email.blank?
      sign_in(:user, user)
      flash[:success] = 'You created a temporary guest account, which will be deleted once you\'re done here' 
      redirect_to root_url
    end
  end

  def create
    auth = request.env["omniauth.auth"]
    user = User.where(:provider => auth['provider'],
                      :uid => auth['uid'].to_s).first || User.create_with_omniauth(auth)
    # Reset the session after successful login, per
    # 2.8 Session Fixation – Countermeasures:
    # http://guides.rubyonrails.org/security.html#session-fixation-countermeasures
    reset_session
    session[:user_id] = user.id
    unless user.email.blank?
      flash[:success] = 'Signed in!'
      redirect_to root_url
    end
  end

  def destroy
    reset_session
    flash[:success] = 'Signed out!'
    redirect_to root_url
  end

  def failure
    flash[:danger] = "Authentication error: #{params[:message].humanize}"
    redirect_to root_url
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end