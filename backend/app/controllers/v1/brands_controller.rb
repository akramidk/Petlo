module V1
  class BrandsController < ApplicationController
    include BrandsHelper

    def index
      response = BrandsHelper.index(
        country: "JO",
        language: params[:locale],
        featured: params[:featured],
        limit: params[:limit].to_i,
        page: params[:page].to_i
      )

      render json: response, status: 200
    end
  end
end
