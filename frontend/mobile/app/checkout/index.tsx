import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { PAYMENT_METHODS } from "../../src/constants";
import { Endpoints } from "../../src/enums";
import { useAPIMutation } from "../../src/hooks";
import { BaseOption } from "../../src/interfaces";
import Loading from "../_Loading";
import { Options, OptionsWithLabel } from "../../src/components/atoms";

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

  const [paymentMethod, setPaymentMethod] = useState<BaseOption>();

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

  return (
    <PageStructure title="Checkout" backButton={router.back}>
      <View>
        <OptionsWithLabel
          label={{
            name: "Payment Method",
            require: true,
          }}
          options={{
            optionValueCn: "text-[#666]",
            optionValueFont: "semiBold",
            options: PAYMENT_METHODS,
            signalSelect: {
              selectedOption: paymentMethod,
              setSelectedOption: setPaymentMethod,
            },
            translate: true,
          }}
        />
      </View>
    </PageStructure>
  );
};

export default Checkout;
