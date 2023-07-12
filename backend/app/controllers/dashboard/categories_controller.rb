module Dashboard
  class CategoriesController < ApplicationController
    before_action :check_dashboard_key

    def index
      data = Category.all.map{|category| {
        id: category.public_id,
        name: category.name,
        parent_id: category.parent_id ? Category.find_by(id: category.parent_id).public_id : nil
      }}

      render json: { data: data }, status: 200
    end

    def create
      Category.create!(
        name: params[:name],
        parent_id: Category.find_by(public_id: params[:parent_id]).id
      )

      render json: { status: "succeeded" }, status: 200
    end

    def show
      category = Category.find_by(public_id: param[:id])
      parent = category.parent_id ? Category.find_by(id: category.parent_id) : nil
      data = {
        id: category.public_id,
        name: category.name,
        parent: parent ? {
          id: parent.public_id,
          name: parent.name
        } : nil
      }

      render json: { data: data }, status: 200
    end

    def update
      category = Category.find_by(public_id: param[:id])

      category.update!(
        name: params[:name],
        parent_id: Category.find_by(public_id: params[:parent_id]).id
      )

      render json: { status: "succeeded" }, status: 200
    end
  end
end