module V1
  class CategoriesController < ApplicationController    
    include CategoriesHelper

    def category_items
      #TODO I did the country thingy becuse of Apple, we'll handle it in the future
      response = CategoriesHelper.items(
        category_public_id: params[:public_id],
        brand_public_id: params[:brand_public_id],
        country: "JO",
        language: params[:locale],
        page: params[:page].to_i
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end
  end
end