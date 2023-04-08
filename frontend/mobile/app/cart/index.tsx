import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching, useCartStore } from "../../src/hooks";
import { CartItemProps, CartSummaryResponse } from "../../src/interfaces";
import Loading from "../_Loading";
import Item from "./_Item";

const Cart = () => {
  const router = useRouter();
  const { summary, cartId, setSummary } = useCartStore();
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

    return summary.items.map((item, i) => {
      const variant = item.variants[i];

      return {
        itemPublicId: item.public_id,
        variantPublicId: variant.public_id,
        options: variant.options,
        name: item.name,
        image: item.image,
        quantity: variant.quantity,
        amount: `${variant.amount} ${summary.currency}`,
      };
    });
  }, [summary]);

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
    <PageStructure title="Your Cart" backButton={router.back}>
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
