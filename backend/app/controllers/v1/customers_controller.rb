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

      begin
        response = CustomersHelper.create(
          name: name,
          country: country,
          phone_number: phone_number,
          password: password,
          language: language
        )

        render json: { status: "succeeded", session_token: response[:session_token] }, status: 200
      rescue RuntimeError => message
        render json: { status: "failed", message: message }, status: 400
      end
    end

    def verification
      verification_code = params[:verification_code]

      begin
        response = CustomersHelper.verification(
          customer: @customer,
          verification_code: verification_code
        )
        
        render json: { status: "succeeded" }, status: 200
      rescue RuntimeError => message
        render json: { status: "failed", message: message }, status: 400
      end
    end
  end
end
