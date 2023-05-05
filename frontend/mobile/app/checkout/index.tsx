import { useRouter, useSearchParams } from "expo-router";
import { useEffect } from "react";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIMutation } from "../../src/hooks";
import Loading from "../_Loading";

const Checkout = () => {
  const router = useRouter();
  const { cartId } = useSearchParams();
  const {
    response: createCheckoutResponse,
    trigger: createCheckoutTrigger,
    status: createCheckoutStatus,
  } = useAPIMutation<unknown, unknown>({
    endpoint: Endpoints.CHECKOUT,
    method: "POST",
    options: {},
  });

  useEffect(() => {
    createCheckoutTrigger({
      card_id: cartId,
    });
  }, []);

  if (
    createCheckoutResponse === undefined ||
    createCheckoutResponse?.status === "loading"
  ) {
    return <Loading />;
  }

  return <PageStructure title="Checkout" backButton={router.back} />;
};

export default Checkout;
