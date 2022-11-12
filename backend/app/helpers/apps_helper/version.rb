module AppsHelper::Version
  APP_VERSION = {
    "ios" => 1.0,
    "android" => 1.0
  }
  
  def version(app_version:, phone_os:)
    if app_version.to_f < APP_VERSION[phone_os]
      { status: true }
    else
      { status: false }
    end
  end
end
