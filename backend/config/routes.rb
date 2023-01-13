require 'sidekiq/web'

Rails.application.routes.draw do
  root "pages#index"
  mount Sidekiq::Web => "/sidekiq"

  scope "/:locale" do
    namespace :v1 do
      #apps
      get "apps/new-version-available", to: "apps#version"
      
      #customers
      post "customers", to: "customers#create"

      post "customers/verification", to: "verifications#verify"
      post "customers/verification/resend-code", to: "verifications#resend_code"
      post "customers/verification/change-phone-number", to: "verifications#change_phone_number"

      post "customers/request-permission", to: "customers#request_permission"
      delete "customers", to: "customers#delete"

      post "customers/request-reset-password", to: "customers#request_reset_password"
      post "customers/verify-reset-password-request", to: "customers#verify_reset_password_request"
      
      #sessions
      get "sessions", to: "sessions#index"
      post "sessions", to: "sessions#create"
      post "sessions/verification", to: "sessions#verification"
      post "sessions/verification/resend-code", to: "sessions#resend_verification_code"

      #search
      get "search", to: "search#index"

      #sections
      get "sections", to: "sections#index"

      #categories
      get "categories/:category/items", to: "categories#category_items"

      #items
      get "items/:public_id", to: "items#show"
      
      #pets
      get "pets", to: "pets#index"
      post "pets", to: "pets#create"
      patch "pets/:public_id/name", to: "pets#change_name"
      patch "pets/:public_id/image", to: "pets#change_image"
      get "pets/information", to: "pets#information"

      #cards
      get "cards", to: "cards#index"
      post "cards", to: "cards#create"

      #addresses
      get "addresses", to: "addresses#index"
      post "addresses", to: "addresses#create"    
    end
  end
end
