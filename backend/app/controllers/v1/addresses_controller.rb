module V1
  class AddressesController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include AddressesHelper

    def index
      response = AddressesHelper.index(
        customer: @customer,
        language: params[:locale],
        page: params[:page]
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end

    def create
      AddressesHelper.create(
        customer: @customer,
        name: params[:name],
        longitude: params[:longitude],
        latitude: params[:latitude]
      )
      
      render json: { status: "succeeded" }, status: 200
    end
  end
end
