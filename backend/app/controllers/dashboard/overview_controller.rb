module Dashboard
  class OverviewController < ApplicationController
    def index
      raise("1000000") if params[:passcode] != "it'smebaby"

      customers = Customer.all.length
      orders = Order.where(status: "preparing").length
      autoships = Autoship.all.length

      render json: { customers: customers, orders: orders, autoships: autoships }, status: 200
    end
  end
end