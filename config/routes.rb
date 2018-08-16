Rails.application.routes.draw do
  resources :ratings

  root to: 'ratings#index'
end
