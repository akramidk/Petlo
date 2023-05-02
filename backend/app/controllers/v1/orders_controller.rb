module V1
    class OrdersController < ApplicationController
        before_action -> { current_customer(verified: true) }

        def create
            response = OrdersHelper.create(
                checkout_id: params[:checkout_id],
                payment: params[:payment],
                pets: params[:pets]
            )
        end
    end
end