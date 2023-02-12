module V1
  class CheckoutController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include CheckoutHelper

    def create
      response = CheckoutHelper.create(
        customer: @customer,
        cart_id: params[:cart_id],
        address_id: params[:address_id],
        language: params[:locale]
      )

      render json: { status: "succeeded", checkout: response }, status: 200
    end

    def change_address
      response = CheckoutHelper.change_address(
        customer: @customer,
        public_id: params[:public_id],
        address_id: params[:address_id],
        language: params[:locale]
      )

      render json: { status: "succeeded", checkout: response }, status: 200
    end
  end
end