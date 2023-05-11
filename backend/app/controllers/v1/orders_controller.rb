module V1
    class OrdersController < ApplicationController
        before_action -> { current_customer(verified: true) }

        include OrdersHelper

        def index
            response = OrdersHelper.index(
                customer: @customer,
                page: params[:page],
                language: params[:locale].to_i
            )

            render json: { has_more: response[:has_more], data: response[:data] }, status: 200
        end

        def create
            OrdersHelper.create(
                customer: @customer,
                checkout_id: params[:checkout_id],
                payment: params[:payment],
                pets: params[:pets]
            )

            render json: { status: "succeeded" }, status: 200
        end
    end
end