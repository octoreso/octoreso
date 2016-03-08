Octoreso::Application.routes.draw do
  devise_for :users, skip: [:registrations], controllers: { omniauth_callbacks: 'callbacks' } do
  end

  scope module: :ingress, constraints: ->(r) { r.subdomain.include?('ingress') } do
    get '/' => 'home#index'

    scope '/api' do
      resources :communities   , only: [:index, :show]
      resources :missions      , only: [:index, :show]
      resources :mission_series, only: [:index, :show]
      resources :user_completed_mission, only: [] do
        member do
          get 'check'
          get 'uncheck'
        end
      end
    end
  end

  scope module: :admin, constraints: ->(r) { r.subdomain.include?('admin') }, as: :admin do
    scope module: :ingress, as: :ingress do
      resources :communities, except: [:edit, :destroy]
    end

    get '/', to: redirect('/communities')
  end

  root to: 'home#index'
end
