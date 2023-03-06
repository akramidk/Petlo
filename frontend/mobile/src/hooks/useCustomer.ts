import { useEffect, useState } from "react";
import { Endpoints, StorageKeys } from "../enums";
import * as SecureStore from "expo-secure-store";
import useAPIFetching from "./useAPIFetching";
import { CheckASessionResponse } from "../interfaces";

const useCustomer = () => {
  const { response, trigger } = useAPIFetching<
    undefined,
    CheckASessionResponse
  >({
    endpoint: null,
    options: {
      shouldRetryOnError: false,
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
      trigger(Endpoints.CheckASession);
    }
  }, [sessionToken]);

  useEffect(() => {
    console.log("response", response);
  }, [response]);

  return { customer };
};

export default useCustomer;
