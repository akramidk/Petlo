require 'rails_helper'

RSpec.describe AppsHelper, type: :helper do
  andorid_app_version = AppsHelper::APP_VERSION["android"]
  ios_app_version = AppsHelper::APP_VERSION["ios"]
  
  it "is return false with android" do
    response = AppsHelper.version(andorid_app_version, "android")
    expect(response[:body][:status]).to eq(false)
  end

  it "is return false with ios" do
    response = AppsHelper.version(ios_app_version, "ios")
    expect(response[:body][:status]).to eq(false)
  end

  it "is return false with android & old data" do
    response = AppsHelper.version(andorid_app_version + 1, "android")
    expect(response[:body][:status]).to eq(false)
  end
  
  it "is return false with ios & old data" do
    response = AppsHelper.version(andorid_app_version + 1, "ios")
    expect(response[:body][:status]).to eq(false)
  end 

  it "is return true with android" do
    response = AppsHelper.version(andorid_app_version - 1, "android")
    expect(response[:body][:status]).to eq(true)
  end
  
  it "is return true with ios" do
    response = AppsHelper.version(andorid_app_version - 1, "ios")
    expect(response[:body][:status]).to eq(true)
  end  
end
