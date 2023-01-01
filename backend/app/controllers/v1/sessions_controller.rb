module V1
  class SessionsController < ApplicationController
    include SessionsHelper

    before_action -> { current_customer(verified: true) }, only: [:index]
    before_action -> { current_customer(
      permission: ENUM::SESSION_TOKEN_PERMISSIONS[:SESSION_VERIFICATION],
      verified: true 
    )}, only: [:verification, :resend_verification_code]

    def index
      response = SessionsHelper.information(
        customer: @customer
      )

      render json: { valid: true, customer: response[:customer] }, status: 200
    end

    def create
      response = SessionsHelper.create(
        phone_number: params[:phone_number],
        password: params[:password],
        language: params[:language]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def verification
      response = SessionsHelper.verification(
        customer: @customer,
        verification_code: params[:verification_code]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def resend_verification_code
      response = SessionsHelper.resend_verification_code(
        customer: @customer,
        language: params[:language]
      )

      render json: { status: "succeeded", customer: response[:customer]}
    end
  end
end
