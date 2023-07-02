import clsx from "clsx";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { Text } from "../../src/components/atoms";
import { PageStructure } from "../../src/components/organisms";
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
import Loading from "../_Loading";
import Item from "./_Item";

// TODO fix addStatus run on all items

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
    >
      <View className="space-y-[28px]">
        <View className="space-y-[20px]">
          {items?.map((item, i) => {
            return (
              <View key={i}>
                <Item {...item} />
              </View>
            );
          })}
        </View>

        {summary && summary.amount !== "0.00" && (
          <View>
            <Text font="extraBold" cn="text-[15px] text-[#0E333C] mb-[12px]">
              {t("CART__PAYMENT_SUMMARY")}
            </Text>

            <View
              className={clsx(
                "justify-between",
                direction === "ltr" ? "flex-row" : "flex-row-reverse"
              )}
            >
              <Text font="semiBold" cn="text-[14px] text-[#666]">
                {t("CART__CART_TOTAL")}
              </Text>
              <Text font="semiBold" cn="text-[14px] text-[#666]">
                {summary.amount} {summary.currency}
              </Text>
            </View>
          </View>
        )}
      </View>
    </PageStructure>
  );
};

export default Cart;
