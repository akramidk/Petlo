import { Endpoints } from "../../src/enums";
import { useAPIMutation, useCartStore } from "../../src/hooks";
import {
  CartAddItemRequest,
  CartAddItemResponse,
  CartItemProps,
  CartRemoveItemRequest,
  CartRemoveItemResponse,
} from "../../src/interfaces";
import { ItemViewer } from "../../src/components/molecules";

const Item = (peops: CartItemProps) => {
  const { cartId, setSummary, setNumberofItems } = useCartStore();

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

  return (
    <ItemViewer
      {...peops}
      add={(itemId: string, variantId: string) => {
        addTrigger({ item_id: itemId, variant_id: variantId });
      }}
      addStatus={addStatus}
      remove={(itemId: string, variantId: string) => {
        removeTrigger({ item_id: itemId, variant_id: variantId });
      }}
      removeStatus={removeStatus}
    />
  );
};

export default Item;
