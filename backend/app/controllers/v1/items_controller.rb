module V1
  class ItemsController < ApplicationController
    include ItemsHelper

    def show
      #TODO I did the country thingy becuse of Apple, we'll handle it in the future
      response = ItemsHelper.index(
        public_id: params[:public_id],
        country: "JO",
        language: params[:locale]
      )

      render json: {
        public_id: response[:public_id],
        name: response[:name],
        available: response[:available],
        brand: response[:brand],
        image: response[:image],
        options: response[:options],
        variants: response[:variants],
        currency: response[:currency]
      }, status: 200
    end
  end
end