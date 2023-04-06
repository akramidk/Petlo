import { useRouter } from "expo-router";
import { useMemo } from "react";
import { PageStructure } from "../../src/components/organisms";
import { useCartContext } from "../../src/hooks";
import { CartSummaryResponse } from "../../src/interfaces";
import Loading from "../_Loading";

const Cart = () => {
  const router = useRouter();
  const { summary } = useCartContext();

  const items = useMemo(() => {
    if (!summary) return;

    return (summary as CartSummaryResponse).items.map((item) => {
      item.variants.map((variant) => {
        return {
          itemPublicId: item.public_id,
          variantPublicId: variant.public_id,
          name: item.name,
          image: item.image,
          quantity: variant.quantity,
          amount: `${variant.amount} ${summary.currency}`,
        };
      });
    });
  }, [summary]);

  if (!summary) {
    return <Loading />;
  }

  return (
    <PageStructure title="Your Cart" backButton={router.back}></PageStructure>
  );
};

export default Cart;
