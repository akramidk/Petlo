import { useEffect, useState } from "react";
import { Endpoints, StorageKeys } from "../enums";
import * as SecureStore from "expo-secure-store";
import useAPIFetching from "./useAPIFetching";
import { CheckASessionResponse, Customer } from "../interfaces";

const useCustomer = () => {
  const [sessionToken, setSessionToken] = useState<undefined | string>(
    undefined
  );
  const [customer, setCustomer] = useState<Customer>();

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
      overwriteSessionToken: sessionToken,
    },
  });

  useEffect(() => {
    (async () => {
      // TODO remove it
      //await SecureStore.deleteItemAsync(StorageKeys.SESSION_TOKEN);

      setSessionToken(
        await SecureStore.getItemAsync(StorageKeys.SESSION_TOKEN)
      );
    })();
  }, []);

  useEffect(() => {
    if (sessionToken === undefined) return;

    if (sessionToken === null) {
      setCustomer(null);
    } else {
      setWait(false);
    }
  }, [sessionToken]);

  useEffect(() => {
    if (response === undefined) return;

    if (response?.statusCode === 200) {
      setCustomer({
        name: response.body.customer.name,
        sessionToken: sessionToken,
      });
    } else {
      setCustomer(null);
    }
  }, [response]);

  const setCustomerWithSessionToken = async (customer: Customer) => {
    await SecureStore.setItemAsync(
      StorageKeys.SESSION_TOKEN,
      customer.sessionToken
    );

    setCustomer(customer);
  };

  const clearCustomer = async () => {
    await SecureStore.deleteItemAsync(StorageKeys.SESSION_TOKEN);
    setCustomer(null);
  };

  return {
    customer,
    setCustomer,
    setCustomerWithSessionToken,
    sessionToken,
    clearCustomer,
  };
};

export default useCustomer;
