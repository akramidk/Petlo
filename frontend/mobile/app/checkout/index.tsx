import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { PAYMENT_METHODS } from "../../src/constants";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useAPIMutation,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  BaseOption,
  Card,
  CustomerCardsRequest,
  CustomerCardsResponse,
} from "../../src/interfaces";
import Loading from "../_Loading";
import { Link, OptionsWithLabel } from "../../src/components/atoms";
import { cardToDataCard } from "../../src/utils";
import { DataCard } from "../../src/components/molecules";

const Checkout = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const { cartId } = useSearchParams();
  const { response: createCheckoutResponse, trigger: createCheckoutTrigger } =
    useAPIMutation<unknown, unknown>({
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
    return cardsResponse.body?.data?.map((card) => {
      return {
        id: card.public_id,
        value: (
          <DataCard
            {...cardToDataCard({
              card: card,
              direction: direction,
              t: t,
            })}
            withoutContainerStyles
          />
        ) as React.ReactNode,
      };
    });
  }, [cardsResponse]);

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

            <Link
              valueCN="text-[#9747FF] text-[14px]"
              value="+ Add New Card To Use"
              onClick={() => router.push("/account/cards/add-new-card")}
            />
          </View>
        )}
      </View>
    </PageStructure>
  );
};

export default Checkout;
