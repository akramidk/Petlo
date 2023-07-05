import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import {
  CustomerPetsRequest,
  CustomerPetsResponse,
  DataCardProps,
} from "../../../src/interfaces";
import Loading from "../../Loading";

const Pets = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { response } = useAPIFetching<
    CustomerPetsRequest,
    CustomerPetsResponse
  >({
    endpoint: Endpoints.CUSTOMER_PETS,
    options: {
      withPagination: true,
    },
  });

  const pets: DataCardProps[] = useMemo(() => {
    if (response.isFetching) return [];

    return response.body.data.map((pet) => {
      return {
        primaryText: pet.name,
        secondaryText: `${pet.breed} ${pet.gender}`,
      };
    });
  }, [response]);

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("PETS__TITLE")}
      button={{
        value: t("PETS__ADD_NEW_BUTTON"),
        onClick: () => router.push("/account/pets/add-new-pet"),
      }}
      backButton={router.back}
    >
      <DataCards data={pets} />
    </PageStructure>
  );
};

export default Pets;
