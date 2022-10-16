module V1
  class SessionsController < ApplicationController
    before_action -> { current_customer(verified: false) }

    def index
      render json: @customer
    end
  end
end
