import { Endpoints } from "../../../src/enums";
import { useAPIMutation, useCartStore } from "../../../src/hooks";
import {
  CartAddItemRequest,
  CartAddItemResponse,
  CartItemProps,
  CartRemoveItemRequest,
  CartRemoveItemResponse,
} from "../../../src/interfaces";
import { ItemViewer } from "../../../src/components/molecules";
import { useContext, useEffect } from "react";
import IsChangingContext from "./IsChangingContext";

const Item = (props: CartItemProps) => {
  const { cartId, setSummary, setNumberofItems } = useCartStore();

  const { isChanging, setIsChanging } = useContext(IsChangingContext);

  const {
    response: addResponse,
    trigger: addTrigger,
    status: addStatus,
  } = useAPIMutation<CartAddItemRequest, CartAddItemResponse>({
    endpoint: Endpoints.CART_ADD_ITEM,
    method: "POST",
    slugs: {
      publicId: cartId,
    },
    options: {
      onSucceeded: () => {
        setSummary(addResponse.body.cart);
        setNumberofItems(addResponse.body.cart.number_of_items);
      },
      resetSucceededStatusAfter: 500,
    },
  });

  const {
    response: removeResponse,
    trigger: removeTrigger,
    status: removeStatus,
  } = useAPIMutation<CartRemoveItemRequest, CartRemoveItemResponse>({
    endpoint: Endpoints.CART_REMOVE_ITEM,
    method: "DELETE",
    slugs: {
      publicId: cartId,
    },
    options: {
      onSucceeded: () => {
        setSummary(removeResponse.body.cart);
        setNumberofItems(removeResponse.body.cart.number_of_items);
      },
      resetSucceededStatusAfter: 500,
    },
  });

  useEffect(() => {
    setIsChanging(addStatus === "loading" || removeStatus === "loading");
  }, [addStatus, removeStatus]);

  return (
    <ItemViewer
      {...props}
      add={(itemId: string, variantId: string) => {
        addTrigger({ item_id: itemId, variant_id: variantId });
      }}
      addStatus={isChanging && addStatus !== "loading" ? "inactive" : addStatus}
      remove={(itemId: string, variantId: string) => {
        removeTrigger({ item_id: itemId, variant_id: variantId });
      }}
      removeStatus={
        isChanging && removeStatus !== "loading" ? "inactive" : removeStatus
      }
    />
  );
};

export default Item;
