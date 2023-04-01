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
        googleMapsApiKey: "AIzaSyAhFzvU4bnxroW_qaIDBDbjsVfVmx1AtrE",
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
      GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
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
