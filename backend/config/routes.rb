Rails.application.routes.draw do
  root "pages#index"
  
  namespace :v1 do
    #apps
    get "apps/new-version-available", to: "apps#version"
    
    #customers
    post "customers", to: "customers#create"
  end
end
