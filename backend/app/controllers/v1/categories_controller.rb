module V1
  class CategoriesController < ApplicationController    
    include CategoriesHelper

    def index
      response = CategoriesHelper.index(
        #TODO I did the country thingy becuse of Apple, we'll handle it in the future
        country: "JO",
        language: params[:locale],
      )

      render json: { data: response }, status: 200
    end

    def category_items
      #TODO I did the country thingy becuse of Apple, we'll handle it in the future
      response = CategoriesHelper.items(
        category_public_id: params[:public_id],
        brand_public_id: params[:brand_public_id] == "nil" || params[:brand_public_id] == "null" ? nil : params[:brand_public_id],
        country: "JO",
        language: params[:locale],
        page: params[:page].to_i,
        limit: params[:limit].to_i
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end
  end
end