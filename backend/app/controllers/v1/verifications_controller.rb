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
          customer: response[:customer],
          session_token: response[:session_token]
        }, status: 200
      rescue RuntimeError => message
        render json: { status: "failed", message: message }, status: 400
      end
    end
  end
end
