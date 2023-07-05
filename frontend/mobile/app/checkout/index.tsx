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
  CreateNewOrderRequest,
  CreateNewOrderResponse,
  CustomerAddressesRequest,
  CustomerAddressesResponse,
  CustomerCardsRequest,
  CustomerCardsResponse,
  CustomerPetsRequest,
  CustomerPetsResponse,
  UpdateCheckoutAddressRequest,
  UpdateCheckoutAddressResponse,
} from "../../src/interfaces";
import { Loading } from "../../src/components/pages";
import { Link, OptionsWithLabel, Text } from "../../src/components/atoms";
import { cardToDataCard } from "../../src/utils";
import { DataCard } from "../../src/components/molecules";
import clsx from "clsx";
import { buttonStatus } from "../../src/types";

// TODO add the delivery estimation

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

  const { status: createNewOrderStatus, trigger: createNewOrderTrigger } =
    useAPIMutation<CreateNewOrderRequest, CreateNewOrderResponse>({
      endpoint: Endpoints.CREATE_NEW_ORDERS,
      method: "POST",
      options: {
        onSucceeded: () => router.replace("/orders"),
        fireOnSucceededAfter: 2000,
      },
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
      title={t("CHECKOUT__TITLE")}
      backButton={router.back}
      button={{
        value: t("CHECKOUT__BUTTON"),
        onClick: () => {
          const cardObj =
            paymentMethod.id === "card"
              ? {
                  card: {
                    id: card.id as string,
                  },
                }
              : {};

          createNewOrderTrigger({
            checkout_id: checkout.public_id,
            payment: {
              method: paymentMethod.id as "cash" | "card",
              ...cardObj,
            },
            pets: pets?.map((pet) => pet.id) ?? [],
          });
        },
        status: createNewOrderStatus ?? buttonStatus,
      }}
    >
      <OptionsWithLabel
        cn="mb-[24px]"
        label={{
          name: t("CHECKOUT__PAYMENT_METHOD"),
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
              name: t("CHECKOUT__SELECT_A_CARD"),
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

      <View className="mb-[40px]">
        <OptionsWithLabel
          cn="mb-[12px]"
          label={{
            name: t("CHECKOUT__SELECT_AN_ADDRESS"),
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
            preventDeselection: true,
          }}
        />

        <Link
          valueCN="text-[#9747FF] text-[14px]"
          value="+ Add New Address To Use"
          onClick={() => router.push("/account/addresses/add-new-address")}
        />
      </View>

      <View className="mb-[40px]">
        <OptionsWithLabel
          cn="mb-[12px]"
          label={{
            name: t("CHECKOUT__THIS_ORDER_FOR"),
            helperText: t("CHECKOUT__MULTIPLE_CHOICE"),
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
          {t("CHECKOUT__PAYMENT_SUMMARY")}
        </Text>

        <View className="space-y-[12px]">
          <View
            className={clsx(
              "justify-between",
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              {t("CHECKOUT__CART_TOTAL")}
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
              {t("CHECKOUT__DELIVERY_AMOUNT")}
            </Text>
            <Text font="semiBold" cn="text-[14px] text-[#666]">
              {checkout.delivery_amount
                ? `${checkout.delivery_amount} ${checkout.currency}`
                : t("CHECKOUT__SELECT_ADDRESS_FIRST")}
            </Text>
          </View>

          <View
            className={clsx(
              "justify-between",
              direction === "ltr" ? "flex-row" : "flex-row-reverse"
            )}
          >
            <Text font="bold" cn="text-[14px] text-[#444]">
              {t("CHECKOUT__TOTAL_AMOUNT")}
            </Text>
            <Text font="bold" cn="text-[14px] text-[#444]">
              {checkout.delivery_amount
                ? `${checkout.amount} ${checkout.currency}`
                : t("CHECKOUT__SELECT_ADDRESS_FIRST")}
            </Text>
          </View>
        </View>
      </View>
    </PageStructure>
  );
};

export default Checkout;
