import { useRouter } from "expo-router";
import { useMemo } from "react";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import {
  CustomerAddressesRequest,
  CustomerAddressesResponse,
  DataCardProps,
} from "../../../src/interfaces";
import Loading from "../../../src/components/pages/Loading";

const Addresses = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { response } = useAPIFetching<
    CustomerAddressesRequest,
    CustomerAddressesResponse
  >({
    endpoint: Endpoints.CUSTOMER_ADDRESSES,
    options: {
      withPagination: true,
    },
  });

  const addresses: DataCardProps[] = useMemo(() => {
    if (response.isFetching) return;

    return response.body.data.map((address) => {
      return {
        primaryText: address.name,
        secondaryText: address.details,
      };
    });
  }, [response]);

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("ADDRESSES__TITLE")}
      button={{
        value: t("ADDRESSES__ADD_NEW_BUTTON"),
        onClick: () => router.push("/account/addresses/add-new-address"),
      }}
      backButton={router.back}
    >
      <DataCards data={addresses} />
    </PageStructure>
  );
};

export default Addresses;
