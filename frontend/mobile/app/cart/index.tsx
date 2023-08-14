import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ItemsViewer, PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useCartStore,
  useTranslationsContext,
} from "../../src/hooks";
import { CartItemProps, CartSummaryResponse } from "../../src/interfaces";
import { Loading } from "../../src/components/pages";
import Item from "./src/Item";
import IsChangingContext from "./src/IsChangingContext";

const Cart = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  const [isChanging, setIsChanging] = useState(false);

  const { summary, cartId, setSummary, numberofItems } = useCartStore();
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
  }, [summary]);

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
    <IsChangingContext.Provider value={{ isChanging, setIsChanging }}>
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
                status: isChanging ? "inactive" : "active",
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
    </IsChangingContext.Provider>
  );
};

export default Cart;
