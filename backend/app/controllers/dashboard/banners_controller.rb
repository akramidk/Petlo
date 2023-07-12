module Dashboard
  class BannersController < ApplicationController
    before_action :check_dashboard_key
    def index
      data = Banner.all.map{|banner| banner.public_id}
      render json: { data: data }, status: 200
    end
  end
end