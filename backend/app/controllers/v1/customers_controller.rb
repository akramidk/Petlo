module V1 
  class CustomersController < ApplicationController
    include CustomersHelper

    before_action -> { current_customer(verified: true) }, only: [
      :index,
      :change_name,
      :delete,
      :request_permission_with_otp,
      :verify_requested_permission_with_otp,
      :request_permission_with_password
    ]

    before_action -> { current_customer(
      permission: ENUM::PERMISSIONS[:VERIFY_RESET_PASSWORD_REQUEST],
      verified: [true, false] 
    )}, only: [:verify_reset_password_request, :resend_reset_password_code]

    before_action -> { current_customer(
      permission: ENUM::PERMISSIONS[:RESET_PASSWORD],
      verified: [true, false] 
    )}, only: [:reset_password]

    before_action -> { current_customer(
      permission: ENUM::PERMISSIONS[:CHANGE_CUSTOMER_PHONE_NUMBER],
      verified: true
    )}, only: [:change_phone_number]

    before_action -> { current_customer(
      permission: ENUM::PERMISSIONS[:CHANGE_CUSTOMER_PASSWORD],
      verified: true
    )}, only: [:change_password]

    before_action -> { current_customer(
      permission: ENUM::PERMISSIONS[:DELETE_CUSTOMER],
      verified: [true, false] 
    )}, only: [:delete_for_credentials_method]

    def index
      response = CustomersHelper.index(
        customer: @customer,
        language: params[:locale]
      )

      render json: response, status: 200
    end

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

    def change_name
      response = CustomersHelper.change_name(
        customer: @customer,
        name: params[:name]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def change_phone_number
      response = CustomersHelper.change_phone_number(
        customer: @customer,
        phone_number: params[:phone_number],
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: { session_token: response } }, status: 200
    end

    def change_password
      response = CustomersHelper.change_password(
        customer: @customer,
        password: params[:password]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def delete
      response = CustomersHelper.delete(
        customer: @customer,
        verification_code: params[:verification_code]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def request_permission_with_otp
      response = CustomersHelper.request_permission_with_otp(
        customer: @customer,
        permission: params[:permission],
        language: params[:locale]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def verify_requested_permission_with_otp
      response = CustomersHelper.verify_requested_permission_with_otp(
        customer: @customer,
        verification_code: params[:verification_code],
        permission: params[:permission]
      )

      render json: { status: "succeeded", customer: { session_token: response } }, status: 200
    end

    def request_permission_with_password
      response = CustomersHelper.request_permission_with_password(
        customer: @customer,
        permission: params[:permission],
        password: params[:password]
      )

      render json: { customer: { session_token: response } }, status: 200
    end

    #reset password process without sign in
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

    def resend_reset_password_code
      response = CustomersHelper.resend_reset_password_code(
        customer: @customer,
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def reset_password
      response = CustomersHelper.reset_password(
        customer: @customer,
        password: params[:password]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def request_deleting_the_account_with_credentials
      response = CustomersHelper.request_deleting_the_account_with_credentials(
        phone_number: params[:phone_number],
        password: params[:password],
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: { session_token: response } }, status: 200
    end

    def delete_for_credentials_method
      response = CustomersHelper.delete(
        customer: @customer,
        verification_code: params[:verification_code]
      )

      render json: { status: "succeeded" }, status: 200
    end
  end
end