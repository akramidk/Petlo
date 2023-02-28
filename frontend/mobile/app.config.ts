export default {
  expo: {
    name: "Petlo",
    slug: "Petlo",
    scheme: "acme",
    web: {
      bundler: "metro",
    },
    extra: {
      API_URL: process.env.API_URL,
    },
  },
};
