Rails.application.routes.draw do
  root "pages#index"
  
  namespace :v1 do
    post "customers", to: "customers#create"
  end
end
