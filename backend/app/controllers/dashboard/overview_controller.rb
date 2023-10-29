module Dashboard
  class OverviewController < ApplicationController
    before_action :check_dashboard_key
    
    def index
      customers = Customer.all
      orders = Orders.where(status: "preparing")
      autoships = Autoship.all

      render json: { customers: customers, orders: orders, autoships: autoships }, status: 200
    end
  end
end