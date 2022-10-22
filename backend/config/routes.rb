require 'sidekiq/web'

Rails.application.routes.draw do
  root "pages#index"
  mount Sidekiq::Web => "/sidekiq"

  namespace :v1 do
    #apps
    get "apps/new-version-available", to: "apps#version"
    
    #customers
    post "customers", to: "customers#create"

    #verifications
    post "customers/verification", to: "verifications#verify"
    post "customers/verification/resend-code", to: "verifications#resend_code"
    post "customers/verification/change-phone-number", to: "verifications#change_phone_number"

    #sessions
    get "sessions", to: "sessions#index"
  end
end
