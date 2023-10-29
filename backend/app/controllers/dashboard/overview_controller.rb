module Dashboard
  class OverviewController < ApplicationController
    before_action :check_dashboard_key
    
    def index
      customers = Customer.all.length
      orders = Order.where(status: "preparing").length
      autoships = Autoship.all.length

      render json: { customers: customers, orders: orders, autoships: autoships }, status: 200
    end
  end
end