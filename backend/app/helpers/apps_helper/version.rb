module AppsHelper::Version
  APP_VERSION = {
    "ios" => "1.0.0",
    "android" => "1.0.0"
  }
  
  def version(app_version:, phone_os:)
    if app_version < APP_VERSION[phone_os]
      true
    else
      false
    end
  end
end
