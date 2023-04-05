import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Endpoints, StorageKeys } from "../enums";
import {
  CartAddItemRequest,
  CartNumberOfItemsResponse,
  CreateNewCartResponse,
} from "../interfaces";
import useAPIFetching from "./useAPIFetching";
import useAPIMutation from "./useAPIMutation";

const useCart = () => {
  const [initialCartId, setInitialCartId] = useState<string>();
  const [cartId, setCartId] = useState<string>();
  const [numberOfItems, setNumberOfItems] = useState<number>(0);

  const {
    response: createResponse,
    trigger: createTrigger,
    status: createStatus,
  } = useAPIMutation<void, CreateNewCartResponse>({
    endpoint: Endpoints.CREATE_NEW_CART,
    method: "POST",
    options: {},
  });

  const { response: numberOfItemsResponse } = useAPIFetching<
    void,
    CartNumberOfItemsResponse
  >({
    endpoint: Endpoints.CART_NUMBER_OF_ITEMS,
    slugs: {
      publicId: initialCartId,
    },
    options: {
      wait: !initialCartId,
    },
  });

  const { trigger: addTrigger, status: addStatus } = useAPIMutation<
    CartAddItemRequest,
    undefined
  >({
    endpoint: Endpoints.CART_ADD_ITEM,
    method: "POST",
    slugs: {
      publicId: initialCartId ?? cartId,
    },
    options: {
      onSucceeded: () => setNumberOfItems(numberOfItems + 1),
    },
  });

  useEffect(() => {
    (async () => {
      setInitialCartId(await AsyncStorage.getItem(StorageKeys.CART));
    })();
  }, []);

  useEffect(() => {
    const publicId = createResponse?.body?.cart?.public_id;
    if (!publicId) return;

    setCartId(publicId);
    AsyncStorage.setItem(StorageKeys.CART, publicId);
  }, [createResponse]);

  useEffect(() => {
    if (
      numberOfItemsResponse?.isFetching ||
      !numberOfItemsResponse?.body?.value
    )
      return;

    setNumberOfItems(numberOfItemsResponse.body.value);
  }, [numberOfItemsResponse]);

  console.log("in", initialCartId ?? cartId);

  const add = useCallback(
    async (itemId: string, variantId: string) => {
      if (!initialCartId && !cartId) {
        await createTrigger(undefined);
      }

      addTrigger({
        item_id: itemId,
        variant_id: variantId,
      });
    },
    [initialCartId, cartId]
  );

  return { numberOfItems, createStatus, add, addStatus };
};

export default useCart;
