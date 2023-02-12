module V1
    class CartsController < ApplicationController
      before_action -> { current_customer(verified: true) }
  
      include CartsHelper
  
      def create
        response = CartsHelper.create(
          customer: @customer,
          language: params[:locale]
        )
  
        render json: { status: "succeeded", cart: response }, status: 200
      end

      def summary
        response = CartsHelper.summary(
          customer: @customer,
          cart_id: params[:public_id],
          language: params[:locale]
        )
  
        render json: response, status: 200
      end

      def number_of_items
        response = CartsHelper.number_of_items(
          customer: @customer,
          cart_id: params[:public_id]
        )
  
        render json: { value: response }, status: 200
      end

      def add_item
        response = CartsHelper.add_item(
          customer: @customer,
          cart_id: params[:public_id],
          item_id: params[:item_id],
          variant_id: params[:variant_id],
          language: params[:locale]
        )
  
        render json: { status: "succeeded", cart: response }, status: 200
      end

      def remove_item
        response = CartsHelper.remove_item(
          customer: @customer,
          cart_id: params[:public_id],
          item_id: params[:item_id],
          variant_id: params[:variant_id],
          language: params[:locale]
        )
  
        render json: { status: "succeeded", cart: response }, status: 200
      end
    end
end