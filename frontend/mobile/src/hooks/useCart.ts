import { useCallback, useEffect, useState } from "react";
import { Endpoints } from "../enums";
import { CartAddItemRequest, CreateNewCartResponse } from "../interfaces";
import useAPIMutation from "./useAPIMutation";

const useCart = () => {
  const [cartId, setCartId] = useState<string>();
  const {
    response: createResponse,
    trigger: createTrigger,
    status: createStatus,
  } = useAPIMutation<void, CreateNewCartResponse>({
    endpoint: Endpoints.CREATE_NEW_CART,
    method: "POST",
    options: {},
  });
  const {
    response,
    trigger: addTrigger,
    status: addStatus,
  } = useAPIMutation<CartAddItemRequest, undefined>({
    endpoint: Endpoints.CART_ADD_ITEM,
    method: "POST",
    slugs: {
      publicId: cartId,
    },
    options: {},
  });

  useEffect(() => {
    setCartId(createResponse?.body?.cart?.public_id);
  }, [createResponse]);

  const add = useCallback(
    async (itemId: string, variantId: string) => {
      if (cartId === undefined) {
        await createTrigger(undefined);
      }

      addTrigger({
        item_id: itemId,
        variant_id: variantId,
      });
    },
    [cartId]
  );

  return { createStatus, add, addStatus };
};

export default useCart;
