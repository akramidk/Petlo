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
  end
end
