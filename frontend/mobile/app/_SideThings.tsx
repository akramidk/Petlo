import { useEffect } from "react";
import { Endpoints } from "../src/enums";
import { useAPIFetching, useCartStore } from "../src/hooks";
import { CartNumberOfItemsResponse } from "../src/interfaces";

interface SideThingsProps {
  children: React.ReactNode;
}

const SideThings = ({ children }: SideThingsProps) => {
  const cartStore = useCartStore();
  const { response: numberOfItemsResponse } = useAPIFetching<
    void,
    CartNumberOfItemsResponse
  >({
    endpoint: Endpoints.CART_NUMBER_OF_ITEMS,
    slugs: {
      publicId: cartStore.cartId,
    },
    SWROptions: {
      shouldRetryOnError: false,
    },
  });

  useEffect(() => {
    if (numberOfItemsResponse.isFetching) return;

    if (
      numberOfItemsResponse?.body?.value &&
      numberOfItemsResponse.body.value > 0
    ) {
      cartStore.setNumberofItems(numberOfItemsResponse.body.value);
    }
  }, [numberOfItemsResponse]);

  return <>{children}</>;
};

export default SideThings;
