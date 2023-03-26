module V1
  class CategoriesController < ApplicationController
    before_action -> { current_customer(verified: true) }
    
    include CategoriesHelper

    def category_items
      response = CategoriesHelper.items(
        category: params[:category],
        country: @customer.country,
        language: params[:locale],
        page: params[:page].to_i
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end
  end
end