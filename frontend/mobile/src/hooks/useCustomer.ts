import { useEffect, useState } from "react";
import { Endpoints, StorageKeys } from "../enums";
import * as SecureStore from "expo-secure-store";
import useAPIFetching from "./useAPIFetching";
import { CheckASessionResponse, Customer } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCartStore from "./useCartStore";

const useCustomer = () => {
  const { setCartId, setNumberofItems, setSummary } = useCartStore();
  const [sessionToken, setSessionToken] = useState<undefined | string>(
    undefined
  );
  const [customer, setCustomer] = useState<Customer>();
  const [skipCustomer, setSkipCustomer] = useState<boolean>(false);

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
    if (!sessionToken || response === undefined || response.isFetching) return;

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

    if (skipCustomer) {
      setSkipCustomer(false);
    }
  };

  const clearCustomer = async () => {
    await AsyncStorage.removeItem(StorageKeys.CART);
    await SecureStore.deleteItemAsync(StorageKeys.SESSION_TOKEN);

    setCartId(null);
    setNumberofItems(0);
    setSummary(undefined);

    setSessionToken(null);
    setCustomer(null);
  };

  return {
    customer,
    setCustomer,
    setCustomerWithSessionToken,
    sessionToken,
    clearCustomer,
    skipCustomer,
    setSkipCustomer,
  };
};

export default useCustomer;
