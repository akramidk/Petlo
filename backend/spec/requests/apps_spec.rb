require 'rails_helper'
require 'json'

RSpec.describe "Apps", type: :request do
  andorid_app_version = AppsHelper::APP_VERSION["android"]
  ios_app_version = AppsHelper::APP_VERSION["ios"]
  
  describe "GET /apps/new-version-available" do
    it "is return false with android" do
      get "/v1/apps/new-version-available", :params => {
        "app_version": andorid_app_version,
        "phone_os": "android"
      }

      expect(JSON.parse(response.body)["status"]).to eq(false)
    end
    
    it "is return false with ios" do
      get "/v1/apps/new-version-available", :params => {
        "app_version": ios_app_version,
        "phone_os": "ios"
      }

      expect(JSON.parse(response.body)["status"]).to eq(false)
    end

    it "is return false with android & old data" do
      get "/v1/apps/new-version-available", :params => {
        "app_version": andorid_app_version + 1,
        "phone_os": "android"
      }

      expect(JSON.parse(response.body)["status"]).to eq(false)
    
    end
    
    it "is return false with ios & old data" do
      get "/v1/apps/new-version-available", :params => {
        "app_version": ios_app_version + 1,
        "phone_os": "ios"
      }

      expect(JSON.parse(response.body)["status"]).to eq(false)
    end
    
    it "is return true with android" do
      get "/v1/apps/new-version-available", :params => {
        "app_version": andorid_app_version - 1,
        "phone_os": "android"
      }

      expect(JSON.parse(response.body)["status"]).to eq(true)
    end
    
    it "is return true with ios" do
      get "/v1/apps/new-version-available", :params => {
        "app_version": ios_app_version - 1,
        "phone_os": "ios"
      }

      expect(JSON.parse(response.body)["status"]).to eq(true)
    end
  end
end
