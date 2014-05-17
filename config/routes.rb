Tobypinder::Application.routes.draw do
  devise_for :users, controllers: { 
    registrations:      "registrations",
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  get '/auth/:provider/callback', to: 'sessions#create'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  
  get '/auth/guest/new', to: 'sessions#new_guest', as: 'new_guest'

  resources :ld27,        only: :index
  resources :ld29,        only: :index

  resources :categories, only: :show do
    collection do
      get :draft
    end
  end
  root to: "home#index"
  
end