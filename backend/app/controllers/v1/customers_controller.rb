module V1 
  class CustomersController < ApplicationController
    include CustomersHelper

    before_action -> { current_customer(verified: true) }, only: [
      :request_permission,
      :delete
    ]

    def create
      response = CustomersHelper.create(
        name: params[:name],
        country: params[:country],
        phone_number: params[:phone_number],
        password: params[:password],
        language: params[:locale]
      )

      render json: { status: "succeeded", customer: response[:customer] }, status: 200
    end

    def request_permission
      response = CustomersHelper.request_permission(
        customer: @customer,
        permission: params[:permission],
        language: params[:locale]
      )

      render json: { status: "succeeded" }, status: 200
    end

    def delete
      response = CustomersHelper.delete(
        customer: @customer,
        verification_code: params[:verification_code]
      )

      render json: { status: "succeeded" }, status: 200
    end
  end
end