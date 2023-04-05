import { useCallback, useEffect, useState } from "react";
import { Endpoints } from "../enums";
import { CreateNewCartResponse } from "../interfaces";
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
  const { trigger: addTrigger, status: addStatus } = useAPIMutation<
    undefined,
    undefined
  >({
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

  const add = useCallback((item_id: string, variant_id: string) => {
    if (cartId === undefined) {
      createTrigger(undefined);
    }
  }, []);

  return { createStatus, add, addStatus };
};

export default useCart;
