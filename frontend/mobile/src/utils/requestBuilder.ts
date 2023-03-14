import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

const requestBuilder = (endpoint: string, locale: "en" | "ar" | undefined) => {
  const finalLocale = locale ?? "en"; // TODO use the defult
  const URI = `${API_URL}/${finalLocale}/${endpoint}`;

  return { URI };
};

export default requestBuilder;
