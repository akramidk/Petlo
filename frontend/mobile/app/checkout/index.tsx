import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
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
  CreateNewCheckoutRequest,
  CreateNewCheckoutResponse,
  CustomerAddressesRequest,
  CustomerAddressesResponse,
  CustomerCardsRequest,
  CustomerCardsResponse,
  CustomerPetsRequest,
  CustomerPetsResponse,
  UpdateCheckoutAddressRequest,
  UpdateCheckoutAddressResponse,
} from "../../src/interfaces";
import Loading from "../_Loading";
import { Link, OptionsWithLabel, Text } from "../../src/components/atoms";
import { cardToDataCard } from "../../src/utils";
import { DataCard } from "../../src/components/molecules";
import clsx from "clsx";
import { buttonStatus } from "../../src/types";

const Checkout = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
  const { cartId } = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState<BaseOption>();
  const [card, setCard] = useState<BaseOption>();
  const [address, setAddress] = useState<BaseOption>();
  const [pet, setPet] = useState<BaseOption[]>();

  const { response: createCheckoutResponse, trigger: createCheckoutTrigger } =
    useAPIMutation<CreateNewCheckoutRequest, CreateNewCheckoutResponse>({
      endpoint: Endpoints.CREATE_NEW_CHECKOUT,
      method: "POST",
      options: {},
    });

  const {
    response: updateCheckoutAddressResponse,
    trigger: updateCheckoutAddressTrigger,
  } = useAPIMutation<
    UpdateCheckoutAddressRequest,
    UpdateCheckoutAddressResponse
  >({
    endpoint: Endpoints.UPDATE_CHECKOUT_ADDRESS,
    method: "PATCH",
    slugs: {
      publicId: createCheckoutResponse?.body?.checkout?.public_id,
    },
    options: {},
  });

  const checkout =
    updateCheckoutAddressResponse?.body?.checkout ??
    createCheckoutResponse?.body?.checkout;

  //TODO get all isted of pagination
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

  const { response: petsResponse } = useAPIFetching<
    CustomerPetsRequest,
    CustomerPetsResponse
  >({
    endpoint: Endpoints.CUSTOMER_PETS,
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

  const pets = useMemo(() => {
    return petsResponse.body?.data?.map((pet) => {
      return {
        id: pet.public_id,
        value: (
          <DataCard
            primaryText={pet.name}
            secondaryText={`${pet.breed} ${pet.gender}`}
            withoutContainerStyles
          />
        ) as React.ReactNode,
      };
    });
  }, [petsResponse]);

  const buttonStatus: buttonStatus = useMemo(() => {
    if (
      checkout === undefined ||
      checkout.delivery_amount === null ||
      paymentMethod === undefined ||
      (paymentMethod.id === "card" && card === undefined) ||
      address === undefined
    )
      return "inactive";

    return "active";
  }, [checkout, paymentMethod, card, address]);

  useEffect(() => {
    createCheckoutTrigger({
      cart_id: cartId,
    });
  }, []);

  useEffect(() => {
    if (address === undefined) return;
    updateCheckoutAddressTrigger({
      address_id: address.id as string,
    });
  }, [address]);

  if (
    createCheckoutResponse === undefined ||
    createCheckoutResponse.status !== "succeeded" ||
    cardsResponse === undefined ||
    cardsResponse.isFetching ||
    addressesResponse === undefined ||
    addressesResponse.isFetching ||
    petsResponse === undefined ||
    petsResponse.isFetching
  ) {
    return <Loading />;
  }

  return (
    <PageStructure
      title="Checkout"
      backButton={router.back}
      button={{
        value: "Place Order",
        onClick: () => console.log("orderrrrr"),
        status: buttonStatus,
      }}
    >
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
          onClick={() => router.push("/account/addresses/add-new-address")}
        />
      </View>

      <View className="mb-[28px]">
        <OptionsWithLabel
          cn="mb-[12px]"
          label={{
            name: "This Order For",
            helperText: "multiple choice",
          }}
          options={{
            optionValueCn: "text-[#666]",
            optionValueFont: "semiBold",
            options: pets,
            multipleSelect: {
              selectedOptions: pet,
              setSelectedOptions: setPet,
            },
          }}
        />

        <Link
          valueCN="text-[#9747FF] text-[14px]"
          value="+ Add New Pet To Use"
          onClick={() => router.push("/account/pets/add-new-pet")}
        />
      </View>

      <View>
        <Text font="extraBold" cn="text-[15px] text-[#0E333C] mb-[12px]">
          Payment Summary
        </Text>

        <View className="space-y-[12px]">
          <View
            className={clsx(
              "justify-between",
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              Cart Total
            </Text>
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              {checkout.cart_amount} {checkout.currency}
            </Text>
          </View>

          <View
            className={clsx(
              "justify-between",
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              Delivery Amount
            </Text>
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              {checkout.delivery_amount
                ? `${checkout.delivery_amount} ${checkout.currency}`
                : "Select Address First"}
            </Text>
          </View>

          <View
            className={clsx(
              "justify-between",
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Text font="bold" cn="text-[14px] text-[#444]">
              Total Amount
            </Text>
            <Text font="bold" cn="text-[14px] text-[#444]">
              {checkout.delivery_amount
                ? `${checkout.amount} ${checkout.currency}`
                : "Select Address First"}
            </Text>
          </View>
        </View>
      </View>
    </PageStructure>
  );
};

export default Checkout;
