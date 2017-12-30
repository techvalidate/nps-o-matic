Rails.application.routes.draw do
  resources :ratings

  get '/api/nps', to: 'ratings#nps_attributes'

  root to: 'ratings#index'
end
