import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useAPIMutation,
  useCartStore,
  useTranslationsContext,
} from "../../src/hooks";
import {
  CartAddItemRequest,
  CartAddItemResponse,
  CartItemProps,
  CartSummaryResponse,
} from "../../src/interfaces";
import Loading from "../_Loading";
import Item from "./_Item";

const Cart = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const { summary, cartId, setSummary, setNumberofItems } = useCartStore();
  const { response: summaryResponse, setWait: summarySetWait } = useAPIFetching<
    void,
    CartSummaryResponse
  >({
    endpoint: Endpoints.CART_SUMMARY,
    slugs: {
      publicId: cartId,
    },
    options: {
      wait: true,
    },
  });

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
  } = useAPIMutation<CartAddItemRequest, CartAddItemResponse>({
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

  const items: CartItemProps[] = useMemo(() => {
    if (!summary) return;

    return summary.items.map((item, i) => {
      const variant = item.variants[i];

      return {
        options: variant.options,
        name: item.name,
        image: item.image,
        quantity: variant.quantity,
        amount: `${variant.amount} ${summary.currency}`,
        add: () =>
          addTrigger({
            item_id: item.public_id,
            variant_id: variant.public_id,
          }),
        addStatus: addStatus,
        remove: () =>
          removeTrigger({
            item_id: item.public_id,
            variant_id: variant.public_id,
          }),
        removeStatus: removeStatus,
      };
    });
  }, [summary, addStatus, removeStatus]);

  useEffect(() => {
    if (!summary && cartId) summarySetWait(false);
  }, []);

  useEffect(() => {
    if (!summaryResponse || summaryResponse.isFetching) return;
    setSummary(summaryResponse.body);
  }, [summaryResponse]);

  if (!summary && cartId) {
    return <Loading />;
  }

  return (
    <PageStructure title={t("CART__TITLE")} backButton={router.back}>
      {items?.map((item, i) => {
        return (
          <View key={i}>
            <Item {...item} />
          </View>
        );
      })}
    </PageStructure>
  );
};

export default Cart;
