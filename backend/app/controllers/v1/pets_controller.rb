module V1
  class PetsController < ApplicationController
    before_action -> { current_customer(verified: true) }

    include PetsHelper

    def index
      customer = @customer
      language = params[:language]
      page = params[:page]

      response = PetsHelper.index(
        customer: customer,
        language: language,
        page: page
      )

      render json: { has_more: response[:has_more], data: response[:data]}, status: 200
    end

    def create
      customer = @customer
      name = params[:name]
      kind = params[:kind]
      breed = params[:breed]
      gender = params[:gender]

      begin
        PetsHelper.create(
          customer: customer,
          name: name,
          kind: kind,
          breed: breed,
          gender: gender
        )
        
        render json: { status: "succeeded" }, status: 200
      rescue RuntimeError => error
        render json: { status: "failed", message: error.message }, status: 400
      end
    end
  end
end
