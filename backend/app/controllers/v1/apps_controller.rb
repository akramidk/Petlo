module V1
  class AppsController < ApplicationController
    include AppsHelper
    
    def version
      app_version = params[:app_version]
      phone_os = params[:phone_os]

      response = AppsHelper.version(app_version, phone_os)

      render :json => response[:body], :status => response[:status]
    end
  end
end
