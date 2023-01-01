module V1
  class AppsController < ApplicationController
    include AppsHelper
    
    def version
      response = AppsHelper.version(
        app_version: params[:app_version],
        phone_os: params[:phone_os]
      )

      render json: { value: response }, status: 200
    end
  end
end
