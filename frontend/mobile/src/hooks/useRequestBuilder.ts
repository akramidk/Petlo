import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { DEFAULT_APP_LANGUAGE } from "../constants";
import useSettingsContext from "./useSettingsContext";

const API_URL = Constants.expoConfig.extra.API_URL;

interface useRequestBuilderProps {
  endpoint: string;
  withoutAuthorization?: boolean;
  overwriteSessionToken?: string;
}

const useRequestBuilder = ({
  endpoint,
  withoutAuthorization,
  overwriteSessionToken,
}: useRequestBuilderProps) => {
  const settingsContext = useSettingsContext();
  const [sessionToken, setSessionToken] = useState("");

  const locale =
    settingsContext?.languageWithoutGender ??
    DEFAULT_APP_LANGUAGE.withoutGender;

  const URI = `${API_URL}/${locale}${endpoint}`;

  useEffect(() => {
    if (!withoutAuthorization) {
      setSessionToken(
        overwriteSessionToken ?? settingsContext?.customer?.sessionToken ?? ""
      );
    }
  }, [withoutAuthorization, overwriteSessionToken]);

  return { URI, sessionToken };
};

export default useRequestBuilder;
