module V1
  class ItemsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include ItemsHelper

    def show
      public_id = params[:public_id]
      country = @customer.country
      language = params[:language]

      response = ItemsHelper.index(
        public_id: public_id,
        country: country,
        language: language
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
