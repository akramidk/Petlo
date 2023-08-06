module V1
  class SectionsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include SectionsHelper

    def index
      response = SectionsHelper.all(customer: @customer, language: params[:locale], limit: params[:limit])
      render json: { data: response[:data] }, status: 200
    end
  end
end 
