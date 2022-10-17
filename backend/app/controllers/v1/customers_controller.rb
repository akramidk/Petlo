module V1 
  class CustomersController < ApplicationController
    include CustomersHelper

    before_action -> { current_customer(
      permission: ENUM::SESSION_TOKEN_PERMISSIONS[:CUSTOMER_VERIFICATION],
      verified: false 
    )}, only: [:verification]

    def create
      name = params[:name]
      country = params[:country]
      phone_number = params[:phone_number]
      password = params[:password]
      language = params[:language]

      response = CustomersHelper.create(name, country, phone_number, password, language)

      render :json => response[:body], :status => response[:status]
    end

    def verification
      verification_code = params[:verification_code]

      response = CustomersHelper.verification(
        customer: @customer,
        verification_code: verification_code
      )

      render :json => response[:body], :status => response[:status]
    end
  end
end
