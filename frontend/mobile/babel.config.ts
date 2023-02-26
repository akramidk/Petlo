module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["nativewind/babel"],
    plugins: [
      // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      require.resolve("expo-router/babel"),
    ],
  };
};
