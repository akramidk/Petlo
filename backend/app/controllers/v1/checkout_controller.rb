module V1
    class CheckoutController < ApplicationController
      before_action -> { current_customer(verified: true) }
  
      include CheckoutHelper
  
      def index
        response = CheckoutHelper.index(
          customer: @customer,
          cart_id: params[:cart_id],
          address_id: params[:address_id],
          language: params[:locale]
        )
  
        render json: response, status: 200
      end

    end
end  