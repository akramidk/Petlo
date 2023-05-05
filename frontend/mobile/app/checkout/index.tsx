import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { PAYMENT_METHODS } from "../../src/constants";
import { Endpoints } from "../../src/enums";
import { useAPIFetching, useAPIMutation } from "../../src/hooks";
import {
  BaseOption,
  CustomerCardsRequest,
  CustomerCardsResponse,
} from "../../src/interfaces";
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
  const [card, setCard] = useState<BaseOption>();

  useEffect(() => {
    createCheckoutTrigger({
      card_id: cartId,
    });
  }, []);

  const { response: cardsResponse } = useAPIFetching<
    CustomerCardsRequest,
    CustomerCardsResponse
  >({
    endpoint: Endpoints.CUSTOMER_CARDS,
    options: {
      withPagination: true,
    },
  });

  const cards = useMemo(() => {
    return cardsResponse.body.data?.map((card) => {
      return {
        id: card.public_id,
        value: card.last4,
      };
    });
  }, []);

  if (
    createCheckoutResponse === undefined ||
    createCheckoutResponse?.status === "loading" ||
    cardsResponse === undefined ||
    cardsResponse.isFetching
  ) {
    return <Loading />;
  }

  return (
    <PageStructure title="Checkout" backButton={router.back}>
      <View>
        <OptionsWithLabel
          cn="mb-[16px]"
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

        {paymentMethod?.id === "card" && (
          <View>
            <OptionsWithLabel
              label={{
                name: "Select a Card",
                require: true,
              }}
              options={{
                optionValueCn: "text-[#666]",
                optionValueFont: "semiBold",
                options: cards,
                signalSelect: {
                  selectedOption: card,
                  setSelectedOption: setCard,
                },
              }}
            />
          </View>
        )}
      </View>
    </PageStructure>
  );
};

export default Checkout;
