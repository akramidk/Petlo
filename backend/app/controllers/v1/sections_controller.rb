module V1
  class SectionsController < ApplicationController
    include SectionsHelper

    def index
      #TODO Akram did the country thingy becuse of Apple, we'll handle it in the future
      response = SectionsHelper.all(country: "JO", language: params[:locale], limit: params[:limit])
      render json: { data: response[:data] }, status: 200
    end
  end
end 
