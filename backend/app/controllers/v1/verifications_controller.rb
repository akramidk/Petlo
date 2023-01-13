module V1
  class VerificationsController < ApplicationController
    include VerificationsHelper

    before_action -> { current_customer(
      permission: ENUM::VERIFICATION_CODE_PERMISSIONS[:CUSTOMER_VERIFICATION],
      verified: false
    )}

    before_action do
      raise(RuntimeError, 4000000) if @customer.phone_verified?
    end

    def verify
      response = VerificationsHelper.verify(
        customer: @customer,
        verification_code: params[:verification_code]
      )
      
      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def resend_code
      response = VerificationsHelper.resend_code(
        customer: @customer,
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def change_phone_number
      response = VerificationsHelper.change_phone_number(
        customer: @customer,
        phone_number: params[:phone_number],
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end
  end
end