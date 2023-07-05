import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Link, OptionsWithLabel } from "../../../src/components/atoms";
import { DataCard } from "../../../src/components/molecules";
import { PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import {
  useAPIFetching,
  useDataContext,
  useTranslationsContext,
} from "../../../src/hooks";
import {
  BaseOption,
  CustomerAddressesRequest,
  CustomerAddressesResponse,
} from "../../../src/interfaces";
import Loading from "../../../src/components/pages/Loading";

const SelectAddress = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { data, setData } = useDataContext();

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
        value="+ Add New Address To Use"
        onClick={() => router.push("/account/addresses/add-new-address")}
      />
    </PageStructure>
  );
};

export default SelectAddress;
