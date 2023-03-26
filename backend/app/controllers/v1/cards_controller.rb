module V1
  class CardsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include CardsHelper

    def index
      response = CardsHelper.index(
        customer: @customer,
        page: params[:page].to_i
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end

    def create
      response = CardsHelper.create(
        customer: @customer,
        token: params[:token]
      )

      render json: { status: "succeeded" }, status: 200
    end
  end
end
