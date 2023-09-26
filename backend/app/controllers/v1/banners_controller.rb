module V1
    class BannersController < ApplicationController
        include BannersHelper

        def index
            #TODO I did the country thingy becuse of Apple, we'll handle it in the future
            response = BannersHelper.all(
                country: "JO",
                language: params[:locale],
                variant: params[:variant]
            )
        
            render json: response, status: 200
        end
    end
end