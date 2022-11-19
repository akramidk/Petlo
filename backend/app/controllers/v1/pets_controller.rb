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
      image = params[:image]

      begin
        PetsHelper.create(
          customer: customer,
          name: name,
          kind: kind,
          breed: breed,
          gender: gender,
          image: image
        )
        
        render json: { status: "succeeded" }, status: 200
      rescue RuntimeError => error
        render json: { status: "failed", message: error.message }, status: 400
      end
    end

    def change_name
      customer = @customer
      public_id = params[:public_id]
      name = params[:name]

      begin
        PetsHelper.change_name(
          customer: @customer,
          public_id: public_id,
          name: name
        )
        
        render json: { status: "succeeded" }, status: 200
      rescue RuntimeError => error
        status_code = error.message == "pet_not_found" ? 404 : 400
        render json: { status: "failed", message: error.message }, status: status_code
      end
    end

    def change_image
      customer = @customer
      public_id = params[:public_id]
      image = params[:image]

      begin
        PetsHelper.change_image(
          customer: @customer,
          public_id: public_id,
          image: image
        )
        
        render json: { status: "succeeded" }, status: 200
      rescue RuntimeError => error
        status_code = error.message == "pet_not_found" ? 404 : 400
        render json: { status: "failed", message: error.message }, status: status_code
      end
    end

    def informations
      language = params[:language]
      response = PetsHelper.informations(language: language)
      render json: { data: response[:data] }
    end
  end
end
