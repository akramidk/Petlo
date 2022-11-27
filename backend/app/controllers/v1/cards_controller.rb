module V1
  class CardsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include CardsHelper

    def create
      begin
        response = CardsHelper.create(
          customer: @customer,
          token: params[:token]
        )

        render json: { status: "succeeded" }, status: 200
      rescue RuntimeError => error
        render json: { status: "failed", message: error.message }, status: 400
      end
    end
  end
end
