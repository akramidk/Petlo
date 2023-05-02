module V1
    class OrdersController < ApplicationController
        before_action -> { current_customer(verified: true) }

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