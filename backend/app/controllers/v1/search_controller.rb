module V1
  class SearchController < ApplicationController    
    include SearchHelper

    def index
      response = SearchHelper.items(
        country: "JO",
        language: params[:locale],
        value: params[:value]
      )

      render json: { has_more: response[:has_more], data: response[:data]}, status: 200
    end
  end
end
