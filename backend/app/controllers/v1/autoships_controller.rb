module V1
  class AutoshipsController < ApplicationController
    def create
      render json: { status: "succeeded" }, status: 200
    end
  end
end
