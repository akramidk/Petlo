import Constants from "expo-constants";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_APP_LANGUAGE } from "../constants";
import useCustomerContext from "./useCustomerContext";
import useInternationalizationContext from "./useInternationalizationContext";

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
  const settingsContext = useInternationalizationContext();
  const customerContext = useCustomerContext();
  const locale =
    settingsContext?.languageWithoutGender ??
    DEFAULT_APP_LANGUAGE.withoutGender;

  const URI = `${API_URL}/${locale}${endpoint}`;
  const sessionToken = useMemo(() => {
    return (
      overwriteSessionToken ?? customerContext?.customer?.sessionToken ?? ""
    );
  }, [withoutAuthorization, overwriteSessionToken]);

  return { URI, sessionToken };
};

export default useRequestBuilder;
