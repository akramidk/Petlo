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
    endpoint: Endpoints.EDIT_PHONE_NUMBER_ON_VERIFICATION,
    method: "POST",
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

  console.log("cartId", cartId);

  return { add };
};

export default useCart;
