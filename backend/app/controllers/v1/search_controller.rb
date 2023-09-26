module V1
  class SearchController < ApplicationController    
    include SearchHelper

    def index
      #TODO I did the country thingy becuse of Apple, we'll handle it in the future
      response = SearchHelper.items(
        country: "JO",
        language: params[:locale],
        value: params[:value]
      )

      render json: { has_more: response[:has_more], data: response[:data]}, status: 200
    end
  end
end
