module V1 
  class CustomersController < ApplicationController
    include CustomersHelper

    before_action -> { current_customer(verified: true) }, only: [
      :delete,
      :request_permission
    ]

    before_action -> { current_customer(
      permission: ENUM::PERMISSIONS[:VERIFY_RESET_PASSWORD_REQUEST],
      verified: [true, false] 
    )}, only: [:verify_reset_password_request]

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

    def delete
      response = CustomersHelper.delete(
        customer: @customer,
        verification_code: params[:verification_code]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def request_permission
      response = CustomersHelper.request_permission(
        customer: @customer,
        permission: params[:permission],
        language: params[:locale]
      )

      render json: { status: "succeeded" }, status: 200
    end

    #reset password process
    def request_reset_password
      response = CustomersHelper.request_reset_password(
        phone_number: params[:phone_number],
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def verify_reset_password_request
      response = CustomersHelper.verify_reset_password_request(
        customer: @customer,
        verification_code: params[:verification_code]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def reset_password
    end
  end
end