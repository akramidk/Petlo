import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useMemo, useState } from "react";
import { StorageKeys } from "../enums";

const API_URL = Constants.expoConfig.extra.API_URL;

interface useRequestBuilderProps {
  endpoint: string;
  locale?: "en" | "ar";
  withoutAuthorization?: boolean;
  overwriteSessionToken?: string;
}

const useRequestBuilder = ({
  endpoint,
  locale,
  withoutAuthorization,
  overwriteSessionToken,
}: useRequestBuilderProps) => {
  const [sessionToken, setSessionToken] = useState("");

  const finalLocale = locale ?? "en"; // TODO use the defult
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
