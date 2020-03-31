Rails.application.routes.draw do
  root to: 'messages#index'
  resources :posts, only: [:index]
end
