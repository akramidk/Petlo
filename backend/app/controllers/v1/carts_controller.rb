module V1
    class CartsController < ApplicationController
      before_action -> { current_customer(verified: true) }
  
      include CartsHelper
  
      def create
        response = CartsHelper.create(
          customer: @customer,
        )
  
        render json: { status: "succeeded" }, status: 200
      end
    end
end