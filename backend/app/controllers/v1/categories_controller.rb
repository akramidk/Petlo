module V1
  class CategoriesController < ApplicationController
    before_action -> { current_customer(verified: true) }
    
    include CategoriesHelper

    def category_items
      category = params[:category]
      country = @customer.country
      language = params[:language]
      page = params[:page]

      response = CategoriesHelper.items(
        category: category,
        country: country,
        language: language,
        page: page
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end
  end
end
