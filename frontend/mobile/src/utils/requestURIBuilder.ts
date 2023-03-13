import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

const requestURIBuilder = (
  endpoint: string,
  locale: "en" | "ar" | undefined
) => {
  const finalLocale = locale ?? "en"; // TODO use the defult
  return `${API_URL}/${finalLocale}/${endpoint}`;
};

export default requestURIBuilder;
