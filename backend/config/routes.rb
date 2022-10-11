require 'sidekiq/web'

Rails.application.routes.draw do
  root "pages#index"
  mount Sidekiq::Web => "/sidekiq"

  namespace :v1 do
    #apps
    get "apps/new-version-available", to: "apps#version"
    
    #customers
    post "customers", to: "customers#create"
  end
end
