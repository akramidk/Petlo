module V1
  class SectionsController < ApplicationController
    include SectionsHelper

    def index
      #caching is not the best but it's fine for now
      #TODO I did the country thingy becuse of Apple, we'll handle it in the future
      caching_key = "jo_sections_#{params[:locale]}_#{params[:limit]}"
      response = Rails.cache.read(caching_key)

      if response == nil
        response = SectionsHelper.all(country: "JO", language: params[:locale], limit: params[:limit])
        Rails.cache.write(caching_key, response, expires_in: 10800.seconds)
      end
      
      render json: { data: response[:data] }, status: 200
    end
  end
end 
