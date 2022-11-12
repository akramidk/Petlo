module V1
  class VerificationsController < ApplicationController
    include VerificationsHelper

    before_action -> { current_customer(
      permission: ENUM::SESSION_TOKEN_PERMISSIONS[:CUSTOMER_VERIFICATION],
      verified: false
    )}

    def verify
      verification_code = params[:verification_code]

      begin
        response = VerificationsHelper.verify(
          customer: @customer,
          verification_code: verification_code
        )
        
        render json: {
          status: "succeeded",
          customer: response[:customer]
        }, status: 200
      rescue RuntimeError => error
        render json: { status: "failed", message: error.message }, status: 400
      end
    end

    def resend_code
      language = params[:language]

      begin
        response = VerificationsHelper.resend_code(
          customer: @customer,
          language: language
        )

        render json: { status: "succeeded", customer: response[:customer] }, status: 200
      rescue RuntimeError => error
        render json: { status: "failed", message: error.message }, status: 400
      end
    end

    def change_phone_number
      phone_number = params[:phone_number]
      language = params[:language]

      begin
        response = VerificationsHelper.change_phone_number(
          customer: @customer,
          phone_number: phone_number,
          language: language
        )

        render json: { status: "succeeded", customer: response[:customer] }, status: 200
      rescue RuntimeError => error
        render json: { status: "failed", message: error.message }, status: 400
      end
    end
  end
end
