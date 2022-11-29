module V1
  class CardsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include CardsHelper

    def index
      response = CardsHelper.index(
        customer: @customer,
        page: params[:page]
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end

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
