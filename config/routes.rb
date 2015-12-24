Tobypinder::Application.routes.draw do
  devise_for :users, controllers: {
    registrations:      "registrations",
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  get '/auth/:provider/callback', to: 'sessions#create'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  get '/auth/guest/new', to: 'sessions#new_guest', as: 'new_guest'

  scope constraints: lambda{ |r| !r.subdomain.present? || %w(www).include?(r.subdomain) } do
    resources :ld27, only: :index
    resources :ld29, only: :index
    resources :ld32, only: :index do
      collection do
        get 'redirect'
      end
    end
  end

  scope module: :ingress, constraints: lambda{ |r| r.subdomain.include?('ingress') } do
    get '/' => 'home#index'

    scope '/api' do
      resources :missions, only: [:index, :show]
    end
  end

  root to: 'home#index'
end
