module V1 
  class CustomersController < ApplicationController
    include CustomersHelper

    def create
      name = params[:name]
      country = params[:country]
      phone_number = params[:phone_number]
      password = params[:password]
      language = params[:language]

      begin
        response = CustomersHelper.create(
          name: name,
          country: country,
          phone_number: phone_number,
          password: password,
          language: language
        )

        render json: { status: "succeeded", customer: response[:customer] }, status: 200
      rescue RuntimeError => message
        render json: { status: "failed", message: message }, status: 400
      end
    end
  end
end