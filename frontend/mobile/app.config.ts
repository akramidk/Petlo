export default {
  expo: {
    name: "Petlo",
    slug: "Petlo",
    scheme: "acme",
    icon: "./src/assets/images/icon.png",
    version: "1.1",
    updates: {
      url: "https://u.expo.dev/184da1b4-f7ae-47f9-84e1-695fca3a70f0",
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    android: {
      package: "com.petlo",
      versionCode: 1.0,
      config: {
        googleMaps: {
          apiKey: "AIzaSyAhFzvU4bnxroW_qaIDBDbjsVfVmx1AtrE",
        },
      },
    },
    ios: {
      bundleIdentifier: "com.petlo",
      buildNumber: "1.1.0",
      config: {
        googleMapsApiKey: "AIzaSyATNdeJAH58V2JuSVA2C3qL0GO1VORbLzg",
      },
      infoPlist: {
        NSCameraUsageDescription: "This app uses camera to scan.",
      },
    },
    web: {
      bundler: "metro",
    },
    extra: {
      eas: {
        projectId: "184da1b4-f7ae-47f9-84e1-695fca3a70f0",
      },
      API_URL: process.env.API_URL,
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      GOOGLE_ANDROID_MAP_KEY: process.env.GOOGLE_ANDROID_MAP_KEY,
      GOOGLE_IOS_MAP_KEY: process.env.GOOGLE_IOS_MAP_KEY,
    },
    plugins: [
      "expo-localization",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Petlo to use your location.",
        },
      ],
    ],
  },
};
