module V1
  class SessionsController < ApplicationController
    before_action :current_customer

    def index
      render json: @customer
    end
  end
end
