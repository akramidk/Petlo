module Dashboard
  class CategoriesController < ApplicationController
    before_action :check_dashboard_key

    def create
      Category.create!(
        name: params[:name],
        parent_id: params[:parent_id]
      )

      render json: { status: "succeeded" }, status: 200
    end
  end
end