module V1
  class SessionsController < ApplicationController
    include SessionsHelper

    before_action -> { current_customer(verified: true) }

    def index
      response = SessionsHelper.information(
        customer: @customer
      )

      render json: { valid: true, customer: response[:customer] }, status: 200
    end
  end
end
