import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { StorageKeys } from "../enums";

const API_URL = Constants.expoConfig.extra.API_URL;

interface RequestBuilderProps {
  endpoint: string;
  locale?: "en" | "ar";
  withoutAuthorization?: boolean;
  overwriteSessionToken?: string;
}

const requestBuilder = ({
  endpoint,
  locale,
  withoutAuthorization,
  overwriteSessionToken,
}: RequestBuilderProps) => {
  const finalLocale = locale ?? "en"; // TODO use the defult
  const URI = `${API_URL}/${finalLocale}/${endpoint}`;

  return { URI };
};

export default requestBuilder;
