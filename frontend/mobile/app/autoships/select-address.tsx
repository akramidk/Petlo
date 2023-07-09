import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Link, OptionsWithLabel, Text } from "../../src/components/atoms";
import { DataCard } from "../../src/components/molecules";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useDataContext,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import {
  BaseOption,
  CalculateDeliveryAmountRequest,
  CalculateDeliveryAmountResponse,
  CustomerAddressesRequest,
  CustomerAddressesResponse,
} from "../../src/interfaces";
import { Loading } from "../../src/components/pages";
import { View } from "react-native";
import clsx from "clsx";
import { ActivityIndicator } from "react-native-paper";

const SelectAddress = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();
  const { direction } = useInternationalizationContext();

  const [address, setAddress] = useState<BaseOption>();
  const { response: addressesResponse } = useAPIFetching<
    CustomerAddressesRequest,
    CustomerAddressesResponse
  >({
    endpoint: Endpoints.CUSTOMER_ADDRESSES,
    options: {
      withPagination: true,
    },
  });

  const { response: calculationResponse } = useAPIFetching<
    CalculateDeliveryAmountRequest,
    CalculateDeliveryAmountResponse
  >({
    endpoint: Endpoints.CALCULATE_DELIVERY_AMOUNT,
    options: {
      wait: address === undefined,
    },
    body: {
      address_id: address?.id as string,
    },
  });

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

  useEffect(() => {
    if ((addresses ?? []).length === 0 || data?.address === undefined) return;

    setAddress(
      addresses.find((address) => address.id === data.address?.public_id)
    );
  }, []);

  if (addressesResponse === undefined || addressesResponse.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHERE.PRIMARY_TEXT")}
      button={{
        value: t("COMMON__SELECT"),
        onClick: () => {
          setData({
            ...data,
            address: addressesResponse.body.data.find(
              (_address) => address.id === _address.public_id
            ),
            deliveryCalculation: calculationResponse.body,
          });

          router.back();
        },
        status:
          address === undefined || address?.id === data?.address?.public_id
            ? "inactive"
            : "active",
      }}
      link={{ value: t("COMMON__CANCEL"), onClick: router.back }}
    >
      <OptionsWithLabel
        cn="mb-[12px]"
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
        value={t("CREATE_AN_AUTOSHIP__ADD_NEW_ADDRESS_TO_USE")}
        onClick={() => router.push("/account/addresses/add-new-address")}
      />

      <View className="mt-[32px]">
        <Text font="extraBold" cn="text-[15px] text-[#0E333C] mb-[12px]">
          {t("CREATE_AN_AUTOSHIP__DELIVERY_CALCULATION")}
        </Text>

        <View
          className={clsx(
            "justify-between",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <Text font="semiBold" cn="text-[14px] text-[#666]">
            {t("CREATE_AN_AUTOSHIP__DELIVERY_CALCULATION_AMOUNT")}
          </Text>
          <Text font="semiBold" cn="text-[14px] text-[#666]">
            {address === undefined ? (
              t("CREATE_AN_AUTOSHIP__SHOULD_SELECT_AN_ADDRESS")
            ) : calculationResponse === undefined ||
              calculationResponse.isFetching ? (
              <ActivityIndicator animating={true} color="#666" size={14} />
            ) : (
              `${calculationResponse.body.amount} ${calculationResponse.body.currency}`
            )}
          </Text>
        </View>
      </View>
    </PageStructure>
  );
};

export default SelectAddress;
