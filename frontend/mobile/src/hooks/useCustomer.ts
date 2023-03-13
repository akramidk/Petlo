import { useEffect, useState } from "react";
import { Endpoints, StorageKeys } from "../enums";
import * as SecureStore from "expo-secure-store";
import useAPIFetching from "./useAPIFetching/useAPIFetching";
import { CheckASessionResponse } from "../interfaces";

const useCustomer = () => {
  const { response, setWait } = useAPIFetching<
    undefined,
    CheckASessionResponse
  >({
    endpoint: Endpoints.CHECK_SESSION,
    SWROptions: {
      shouldRetryOnError: false,
    },
    options: {
      wait: true,
    },
  });

  const [sessionToken, setSessionToken] = useState<undefined | string>();
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    (async () => {
      setSessionToken(
        await SecureStore.getItemAsync(StorageKeys.SESSION_TOKEN)
      );
    })();
  }, []);

  useEffect(() => {
    if (sessionToken === null) {
      setCustomer(null);
    } else {
      setWait(false);
    }
  }, [sessionToken]);

  useEffect(() => {
    if (response?.statusCode === 200) {
      setCustomer(response.body);
    } else {
      setCustomer(null);
    }
  }, [response]);

  return { customer };
};

export default useCustomer;
