Octoreso::Application.routes.draw do
  scope module: :ingress, constraints: ->(r) { r.subdomain.include?('ingress') || r.subdomain.include?('test') } do
    get '/' => 'home#index'

    scope '/api' do
      resources :communities   , only: [:index, :show]
      resources :missions      , only: [:index, :show]
      resources :mission_series, only: [:index, :show]
    end
  end

  root to: 'home#index'
end
