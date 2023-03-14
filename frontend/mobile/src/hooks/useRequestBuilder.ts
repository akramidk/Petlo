import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useMemo, useState } from "react";
import { StorageKeys } from "../enums";
import useSettingsContext from "./useSettingsContext";

const API_URL = Constants.expoConfig.extra.API_URL;

interface useRequestBuilderProps {
  endpoint: string;
  method: "GET" | "POST";
  requestBody?: unknown;
  withoutAuthorization?: boolean;
  overwriteSessionToken?: string;
}

const useRequestBuilder = ({
  endpoint,
  method,
  requestBody,
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

  const fetcher = async () => {
    return await axios({
      method: method,
      url: URI,
      data: requestBody,
      headers: {
        Authorization: sessionToken,
      },
    }).then((res) => res.data);
  };

  return { URI, sessionToken, fetcher };
};

export default useRequestBuilder;
