module V1
  class SearchController < ApplicationController
    before_action -> { current_customer(verified: true) }
    
    include SearchHelper

    def index
      country = @customer.country
      language = params[:language]
      value = params[:value]

      response = SearchHelper.items(
        country: country,
        language: language,
        value: value
      )

      render json: { has_more: response[:has_more], data: response[:data]}, status: 200
    end
  end
end
