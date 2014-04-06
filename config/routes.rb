Tobypinder::Application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations"}
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  

  resources :categories, only: :show do
    collection do
      get :draft
    end
  end
  root to: "home#index"
 
end