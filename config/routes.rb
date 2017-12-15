Rails.application.routes.draw do
  resources :ratings

  get '/api/ratings', to: 'ratings#get_ratings'

  root to: 'ratings#index'
end
