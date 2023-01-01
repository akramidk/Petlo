module V1
  class PetsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include PetsHelper

    def index
      response = PetsHelper.index(
        customer: @customer,
        language: params[:locale],
        page: params[:page]
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end

    def create
      PetsHelper.create(
        customer: @customer,
        name: params[:name],
        kind: params[:kind],
        breed: params[:breed],
        gender: params[:gender],
        image: params[:image]
      )
      
      render json: { status: "succeeded" }, status: 200
    end

    def change_name
      PetsHelper.change_name(
        customer: @customer,
        public_id: params[:public_id],
        name: params[:name]
      )
      
      render json: { status: "succeeded" }, status: 200
    end

    def change_image
      PetsHelper.change_image(
        customer: @customer,
        public_id: params[:public_id],
        image: params[:image]
      )
      
      render json: { status: "succeeded" }, status: 200
    end

    def information
      response = PetsHelper.information(language: params[:locale])
      render json: { data: response[:data] }, status: 200
    end
  end
end
