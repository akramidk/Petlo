import clsx from "clsx";
import { useRouter } from "expo-router";
import { Fragment, useEffect, useMemo } from "react";
import { View } from "react-native";
import { Text } from "../../src/components/atoms";
import { ItemsViewer, PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useAPIMutation,
  useCartStore,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  CartAddItemRequest,
  CartAddItemResponse,
  CartItemProps,
  CartSummaryResponse,
} from "../../src/interfaces";
import { Loading } from "../../src/components/pages";
import Item from "./_Item";

const Cart = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const { summary, cartId, setSummary, setNumberofItems, numberofItems } =
    useCartStore();
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

    const array: CartItemProps[] = [];
    summary.items.forEach((item) => {
      item.variants.forEach((variant) => {
        array.push({
          itemId: item.public_id,
          variantId: variant.public_id,
          options: variant.options,
          name: item.name,
          image: item.image,
          quantity: variant.quantity,
          amount: `${variant.amount} ${summary.currency}`,
        });
      });
    });

    return array;
  }, [summary, addStatus, removeStatus]);

  useEffect(() => {
    if (!summary && cartId) summarySetWait(false);
  }, []);

  useEffect(() => {
    if (!summaryResponse || summaryResponse.isFetching) return;
    setSummary(summaryResponse.body ?? null);
  }, [summaryResponse]);

  if (summary === undefined && cartId) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("CART__TITLE")}
      backButton={router.back}
      button={
        numberofItems > 0
          ? {
              value: t("CART__CHECKOUT_BUTTON"),
              onClick: () => {
                router.push(`/checkout?cartId=${cartId}`);
              },
            }
          : undefined
      }
      helperText={
        !items || items.length === 0 ? t("CART__CART_IS_EMPTY") : undefined
      }
    >
      <ItemsViewer
        items={items}
        renderItem={(item) => {
          return <Item {...item} />;
        }}
        detailsTranslationValue={t("CART__PAYMENT_SUMMARY")}
        totalTranslationValue={t("CART__CART_TOTAL")}
        amount={summary?.amount}
        currency={summary?.currency}
      />
    </PageStructure>
  );
};

export default Cart;
