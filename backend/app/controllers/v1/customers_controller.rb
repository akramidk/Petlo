module V1 
  class CustomersController < ApplicationController
    include CustomersHelper

    def create
      response = CustomersHelper.create(
        name: params[:name],
        country: params[:country],
        phone_number: params[:phone_number],
        password: params[:password],
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end
  end
end
