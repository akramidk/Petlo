import { useRouter } from "expo-router";
import { useMemo } from "react";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching } from "../../../src/hooks";
import {
  CustomerAddressesRequest,
  CustomerAddressesResponse,
  DataCardProps,
} from "../../../src/interfaces";
import Loading from "../../_Loading";

const Addresses = () => {
  const router = useRouter();
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
      title="Your Addresses"
      button={{
        value: "Add New",
        onClick: () => router.push("/account/addresses/add-new-address"),
      }}
      backButton={router.back}
    >
      <DataCards data={addresses} />
    </PageStructure>
  );
};

export default Addresses;
