module V1 
  class CustomersController < ApplicationController
    include CustomersHelper

    def create
      name = params[:name]
      country = params[:country]
      phone_number = params[:phone_number]
      password = params[:password]
      language = params[:language]

      response = CustomersHelper.create(name, country, phone_number, password, language)

      render :json => response[:body], :status => response[:status]
    end
  end
end
