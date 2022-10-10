module AppsHelper
  APP_VERSION = {
    "ios" => 1.0,
    "android" => 1.0
  }
  
  def self.version(app_version, phone_os)
    if app_version.to_f < APP_VERSION[phone_os]
      { body: { status: true }, status: 200  }
    else
      { body: { status: false }, status: 200  }
    end
  end
end
