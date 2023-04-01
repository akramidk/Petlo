module V1
  class AddressesController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include AddressesHelper

    def index
      response = AddressesHelper.index(
        customer: @customer,
        language: params[:locale],
        page: params[:page].to_i
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end

    def create
      AddressesHelper.create(
        customer: @customer,
        name: params[:name],
        longitude: params[:longitude],
        latitude: params[:latitude],
        language: params[:locale],
      )
      
      render json: { status: "succeeded" }, status: 200
    end

    def change_name
      AddressesHelper.change_name(
        customer: @customer,
        public_id: params[:public_id],
        name: params[:name]
      )
      
      render json: { status: "succeeded" }, status: 200
    end
  end
end
