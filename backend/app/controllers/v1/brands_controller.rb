module V1
  class BrandsController < ApplicationController
    include BrandsHelper

    def index
      response = BrandsHelper.index(
        #TODO I did the country thingy becuse of Apple, we'll handle it in the future
        country: "JO",
        language: params[:locale],
        featured: params[:featured],
        limit: params[:limit].to_i,
        page: params[:page].to_i
      )

      render json: response, status: 200
    end

    def search
      response = BrandsHelper.search(
        #TODO I did the country thingy becuse of Apple, we'll handle it in the future
        country: "JO",
        language: params[:locale],
        value: params[:value]
      )

      render json: { data: response }, status: 200
    end

    def categories
      response = BrandsHelper.categories(
        #TODO I did the country thingy becuse of Apple, we'll handle it in the future
        country: "JO",
        language: params[:locale],
        public_id: params[:public_id]
      )

      render json: { data: response }, status: 200
    end

    def items
      response = BrandsHelper.items(
        #TODO I did the country thingy becuse of Apple, we'll handle it in the future
        country: "JO",
        language: params[:locale],
        public_id: params[:public_id],
        category_public_id: params[:category_public_id],
        limit: params[:limit].to_i,
        page: params[:page].to_i
      )

      render json: response, status: 200
    end
  end
end
