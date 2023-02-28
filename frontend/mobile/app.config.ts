export default {
  expo: {
    name: "Petlo",
    slug: "Petlo",
    scheme: "acme",
    android: {
      package: "com.petlo",
    },
    web: {
      bundler: "metro",
    },
    extra: {
      eas: {
        projectId: "184da1b4-f7ae-47f9-84e1-695fca3a70f0",
      },
      API_URL: process.env.API_URL,
    },
  },
};
