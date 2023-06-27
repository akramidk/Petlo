import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Link, OptionsWithLabel } from "../../../src/components/atoms";
import { DataCard } from "../../../src/components/molecules";
import { PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import {
  BaseOption,
  CustomerAddressesRequest,
  CustomerAddressesResponse,
} from "../../../src/interfaces";
import Loading from "../../_Loading";

const SelectAddress = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

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

  if (addressesResponse === undefined || addressesResponse.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHERE.PRIMARY_TEXT")}
      button={{ value: "Select", onClick: router.back }}
      link={{ value: "Cancel", onClick: router.back }}
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
