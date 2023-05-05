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
  CustomerAddressesRequest,
  CustomerAddressesResponse,
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
  const [address, setAddress] = useState<BaseOption>();

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

  const { response: addressesResponse } = useAPIFetching<
    CustomerAddressesRequest,
    CustomerAddressesResponse
  >({
    endpoint: Endpoints.CUSTOMER_ADDRESSES,
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

  const addresses = useMemo(() => {
    return addressesResponse.body?.data?.map((address) => {
      return {
        id: address.public_id,
        value: (
          <DataCard
            primaryText={address.name}
            secondaryText={address.details}
            withoutContainerStyles
          />
        ) as React.ReactNode,
      };
    });
  }, [addressesResponse]);

  if (
    createCheckoutResponse === undefined ||
    createCheckoutResponse?.status === "loading" ||
    cardsResponse === undefined ||
    cardsResponse.isFetching ||
    addressesResponse === undefined ||
    addressesResponse.isFetching
  ) {
    return <Loading />;
  }

  return (
    <PageStructure title="Checkout" backButton={router.back}>
      <OptionsWithLabel
        cn="mb-[32px]"
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
        <View className="mb-[40px]">
          <OptionsWithLabel
            cn="mb-[12px]"
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

      <View className="mb-[28px]">
        <OptionsWithLabel
          cn="mb-[12px]"
          label={{
            name: "Select an Address",
            require: true,
          }}
          options={{
            optionValueCn: "text-[#666]",
            optionValueFont: "semiBold",
            options: addresses,
            signalSelect: {
              selectedOption: address,
              setSelectedOption: setAddress,
            },
          }}
        />

        <Link
          valueCN="text-[#9747FF] text-[14px]"
          value="+ Add New Address To Use"
          onClick={() => router.push("/account/cards/add-new-address")}
        />
      </View>
    </PageStructure>
  );
};

export default Checkout;
