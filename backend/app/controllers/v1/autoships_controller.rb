module V1
  class AutoshipsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include AutoshipsHelper

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
