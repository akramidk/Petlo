import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { StorageKeys } from "../enums";
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

  const finalLocale = settingsContext?.languageWithoutGender ?? "en"; // TODO use the defult
  const URI = `${API_URL}/${finalLocale}/${endpoint}`;

  if (!withoutAuthorization) {
    (async () => {
      setSessionToken(
        overwriteSessionToken ??
          (await SecureStore.getItemAsync(StorageKeys.SESSION_TOKEN))
      );
    })();
  }

  return { URI, sessionToken };
};

export default useRequestBuilder;
