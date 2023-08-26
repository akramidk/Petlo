import { useRouter, useSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { PAYMENT_METHODS } from "../../src/constants";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useAPIMutation,
  useCartStore,
  useDataContext,
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
import { Warning } from "../../src/components/molecules";

const Checkout = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();
  const { cartId } = useSearchParams();

  const { data, setData } = useDataContext();

  const [paymentMethod, setPaymentMethod] = useState<BaseOption>(
    data?.paymentMethod
  );
  const [card, setCard] = useState<BaseOption>(data?.card);
  const [address, setAddress] = useState<BaseOption>(data?.address);
  const [selectedPets, setSelectedPets] = useState<BaseOption[]>(
    data?.selectedPets
  );

  const { setCartId, setNumberofItems, setSummary } = useCartStore();

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
        onSucceeded: () => {
          setData(undefined);
          setCartId(null);
          setNumberofItems(0);
          setSummary(undefined);

          router.replace("/orders");
        },
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
    if (
      createCheckoutResponse?.body?.checkout?.public_id === undefined ||
      address === undefined
    )
      return;
    updateCheckoutAddressTrigger({
      address_id: address.id as string,
    });
  }, [createCheckoutResponse, address]);

  useEffect(() => {
    const obj = {};

    if (paymentMethod) {
      obj["paymentMethod"] = paymentMethod;
    }

    if (card) {
      obj["card"] = card;
    }

    if (address) {
      obj["address"] = address;
    }

    if (selectedPets) {
      obj["selectedPets"] = selectedPets;
    }

    if (Object.keys(obj).length > 0) {
      setData(obj);
    }
  }, [paymentMethod, card, address, selectedPets]);

  useEffect(() => {
    if (!paymentMethod) {
      setPaymentMethod(PAYMENT_METHODS[0]);
    }

    if (!address && addresses && addresses.length > 0) {
      setAddress(addresses[0]);
    }
  }, []);

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
      backButton={() => {
        setData(undefined);
        router.back();
      }}
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
            pets: selectedPets?.map((pet) => pet.id as string) ?? [],
          });
        },
        status: createNewOrderStatus ?? buttonStatus,
      }}
    >
      <View>
        <View>
          <OptionsWithLabel
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
            <View className="mt-[16px]">
              <OptionsWithLabel
                label={{
                  name: t("CHECKOUT__SELECT_A_CARD"),
                  bottomHelperElement: (
                    <Warning secondText={t("CHECKOUT__CARD_PAYMENT_WARNING")} />
                  ),
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
                cn="mt-[16px]"
                valueCN="text-[#9747FF] text-[14px]"
                value={`+ ${t("CHECKOUT__ADD_NEW_CARD_TO_USE")}`}
                onClick={() => router.push("/account/cards/add-new-card")}
              />
            </View>
          )}
        </View>

        <View
          style={{
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "#ddd",
            marginTop: 36,
            marginBottom: 48,
          }}
        />

        <View>
          <OptionsWithLabel
            label={{
              name: t("CHECKOUT__SELECT_AN_ADDRESS"),
              cn: "p-0",
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
            cn="mt-[16px]"
            valueCN="text-[#9747FF] text-[14px]"
            value={`+ ${t("CHECKOUT__ADD_NEW_ADDRESS_TO_USE")}`}
            onClick={() => router.push("/account/addresses/add-new-address")}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "#ddd",
            marginTop: 48,
            marginBottom: 48,
          }}
        />

        <View>
          <OptionsWithLabel
            label={{
              name: t("CHECKOUT__THIS_ORDER_FOR"),
              helperText: `${(
                t("COMMON__OPTIONAL") as string
              ).toLowerCase()} - ${t("CHECKOUT__MULTIPLE_CHOICE")}`,
              cn: "p-0",
            }}
            options={{
              optionValueCn: "text-[#666]",
              optionValueFont: "semiBold",
              options: pets,
              multipleSelect: {
                selectedOptions: selectedPets,
                setSelectedOptions: setSelectedPets,
              },
            }}
          />

          <Link
            cn="mt-[16px]"
            valueCN="text-[#9747FF] text-[14px]"
            value={`+ ${t("CHECKOUT__ADD_NEW_PET_TO_USE")}`}
            onClick={() => router.push("/account/pets/add-new-pet")}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "#ddd",
            marginTop: 48,
            marginBottom: 48,
          }}
        />

        <View className="space-y-[36px]">
          <View>
            <Text font="extraBold" cn="text-[15px] text-[#0E333C] mb-[12px]">
              {t("CHECKOUT__WILL_BE_DELIVERED")}
            </Text>

            <Text font="semiBold" cn="text-[14px] text-[#666]">
              {checkout.delivery_estimation ??
                t("CHECKOUT__SELECT_ADDRESS_FIRST")}
            </Text>
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
                  {`${checkout.cart_amount} ${checkout.currency} ${
                    paymentMethod?.id === "card"
                      ? `(${checkout.usd_cart_amount} ${t("COMMON__USD")})`
                      : ""
                  }`}
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
                    ? `${checkout.delivery_amount} ${checkout.currency} ${
                        paymentMethod?.id === "card"
                          ? `(${checkout.usd_delivery_amount} ${t(
                              "COMMON__USD"
                            )})`
                          : ""
                      }`
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
                    ? `${checkout.amount} ${checkout.currency} ${
                        paymentMethod?.id === "card"
                          ? `(${checkout.usd_amount} ${t("COMMON__USD")})`
                          : ""
                      }`
                    : t("CHECKOUT__SELECT_ADDRESS_FIRST")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PageStructure>
  );
};

export default Checkout;
