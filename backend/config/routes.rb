require 'sidekiq/web'

Rails.application.routes.draw do
  root "pages#index"
  mount Sidekiq::Web => "/sidekiq"

  scope "/:locale" do
    namespace :v1 do
      #apps
      get "apps/new-version-available", to: "apps#version"
      
      #customers
      get "customers", to: "customers#index"
      post "customers", to: "customers#create"
      patch "customers/name", to: "customers#change_name"
      patch "customers/phone-number", to: "customers#change_phone_number"
      patch "customers/password", to: "customers#change_password"
      delete "customers", to: "customers#delete"

      post "customers/verification", to: "verifications#verify"
      post "customers/verification/resend-code", to: "verifications#resend_code"
      patch "customers/verification/change-phone-number", to: "verifications#change_phone_number"

      post "customers/request-permission-with-otp", to: "customers#request_permission_with_otp"
      post "customers/verify-requested-permission-with-otp", to: "customers#verify_requested_permission_with_otp"
      # TODO should get not post but akram used post to use useAPIMutation
      post "customers/request-permission-with-password", to: "customers#request_permission_with_password"

      post "customers/request-reset-password", to: "customers#request_reset_password"
      post "customers/resend-reset-password-code", to: "customers#resend_reset_password_code"
      post "customers/verify-reset-password-request", to: "customers#verify_reset_password_request"
      patch "customers/reset-password", to: "customers#reset_password"
      
      #sessions
      get "sessions", to: "sessions#index"
      post "sessions", to: "sessions#create"
      post "sessions/verification", to: "sessions#verification"
      post "sessions/verification/resend-code", to: "sessions#resend_verification_code"

      #search
      get "search", to: "search#index"

      #sections
      get "sections", to: "sections#index"

      #banner
      get "banners", to: "banners#index"

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
      patch "addresses/:public_id/name", to: "addresses#change_name"

      #carts
      post "carts", to: "carts#create"
      get "carts/:public_id", to: "carts#summary"
      get "carts/:public_id/number-of-items", to: "carts#number_of_items"
      post "carts/:public_id", to: "carts#add_item"
      delete "carts/:public_id", to: "carts#remove_item"

      #checkout
      post "checkout", to: "checkout#create"
      patch "checkout/:public_id/update-address", to: "checkout#update_address"

      #orders
      get "orders", to: "orders#index"
      post "orders", to: "orders#create"

      #autoships
      get "autoships", to: "autoships#index"
      post "autoships", to: "autoships#create"
      patch "autoships/:public_id/name", to: "autoships#change_name"
      patch "autoships/:public_id/address", to: "autoships#change_address"
      patch "autoships/:public_id/items", to: "autoships#update_items"
      patch "autoships/:public_id/payment-information", to: "autoships#update_payment_information"
      patch "autoships/:public_id/pets", to: "autoships#update_pets"
    end
  end
end
