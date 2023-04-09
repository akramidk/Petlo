export default {
  expo: {
    name: "Petlo",
    slug: "Petlo",
    scheme: "acme",
    android: {
      package: "com.petlo",
      config: {
        googleMaps: {
          apiKey: "AIzaSyAhFzvU4bnxroW_qaIDBDbjsVfVmx1AtrE",
        },
      },
    },
    ios: {
      config: {
        bundleIdentifier: "com.petlo",
        googleMapsApiKey: "AIzaSyATNdeJAH58V2JuSVA2C3qL0GO1VORbLzg",
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
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
    ],
  },
};
