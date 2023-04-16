module V1
    class BannersController < ApplicationController
        before_action -> { current_customer(verified: true) }

        include BannersHelper

        def index
            response = BannersHelper.all(
                country: @customer.country,
                language: params[:locale],
                variant: params[:variant]
            )
        
            render json: response, status: 200
        end
    end
end