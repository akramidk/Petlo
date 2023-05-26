module V1
  class AutoshipsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include AutoshipsHelper

    def index
      response = AutoshipsHelper.index(
        customer: @customer,
        page: params[:page].to_i
      )

      render json: { has_more: response[:has_more], data: response[:data] }, status: 200
    end

    def create
      AutoshipsHelper.create(
        customer: @customer,
        name: params[:name],
        recurring_interval: params[:recurring_interval],
        recurring_interval_count: params[:recurring_interval_count],
        next_shipment_on: params[:next_shipment_on],
        items: params[:items],
        address_id: params[:address_id],
        payment: params[:payment],
        pets: params[:pets]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def change_name
      AutoshipsHelper.change_name(
        customer: @customer,
        public_id: params[:public_id],
        name: params[:name]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def change_address
      AutoshipsHelper.change_address(
        customer: @customer,
        public_id: params[:public_id],
        address_id: params[:address_id]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def update_items
      AutoshipsHelper.update_items(
        customer: @customer,
        public_id: params[:public_id],
        items: params[:items]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def update_payment_information
      AutoshipsHelper.update_payment_information(
        customer: @customer,
        public_id: params[:public_id],
        payment: params[:payment]
      )

      render json: { status: "succeeded" }, status: 200
    end
  end
end
