import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { useCartStore } from "../../src/hooks";
import { CartItemProps, CartSummaryResponse } from "../../src/interfaces";
import Loading from "../_Loading";
import Item from "./_Item";

const Cart = () => {
  const router = useRouter();
  const cartStore = useCartStore();
  const summary = cartStore.summary;

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

  if (!summary) {
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
