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
      phone_number = params[:phone_number]
      password = params[:password]
      language = params[:language]

      begin
        response = SessionsHelper.create(
          phone_number: phone_number,
          password: password,
          language: language
        )

        render json: { status: "succeeded", verified: response[:verified], session_token: response[:session_token] }, status: 200
      rescue RuntimeError => message
        render json: { status: "failed", message: message  }, status: 400
      end
    end

    def verification
      verification_code = params[:verification_code]

      begin
        response = SessionsHelper.verification(
          customer: @customer,
          verification_code: verification_code
        )

        render json: { status: "succeeded", customer: response[:customer], session_token: response[:session_token] }, status: 200
      rescue RuntimeError => message
        render json: { status: "failed", message: message  }, status: 400
      end
    end

    def resend_verification_code
      language = params[:language]

      response = SessionsHelper.resend_verification_code(
        customer: @customer,
        language: language
      )

      render json: { status: "succeeded", session_token: response[:session_token ]}
    end
  end
end
