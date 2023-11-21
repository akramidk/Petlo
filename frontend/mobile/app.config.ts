export default {
  expo: {
    name: "Petlo",
    slug: "Petlo",
    scheme: "acme",
    icon: "./src/assets/images/icon.png",
    version: "1.4.0",
    updates: {
      url: "https://u.expo.dev/184da1b4-f7ae-47f9-84e1-695fca3a70f0",
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    android: {
      package: "com.petlo",
      versionCode: 9.0,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_ANDROID_MAP_KEY,
        },
      },
    },
    ios: {
      bundleIdentifier: "com.petlo",
      buildNumber: "1.11.0",
      config: {
        googleMapsApiKey: process.env.GOOGLE_IOS_MAP_KEY,
      },
      infoPlist: {
        NSCameraUsageDescription: "This app uses camera to scan.",
        LSApplicationQueriesSchemes: ["itms-apps", "whatsapp"],
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
      FUNCTIONS_URL: process.env.FUNCTIONS_URL,
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
