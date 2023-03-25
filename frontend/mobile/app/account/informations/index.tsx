import { useRouter } from "expo-router";
import { Fragment, useMemo } from "react";
import { Text, View } from "react-native";
import { SmallButton } from "../../../src/components/atoms";
import { DataCard } from "../../../src/components/molecules";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../../src/hooks";
import {
  CustomerInformationsResponse,
  DataCardProps,
} from "../../../src/interfaces";

const Informations = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { response } = useAPIFetching<undefined, CustomerInformationsResponse>({
    endpoint: Endpoints.CUSTOMER_INFORMATIONS,
  });

  const data: DataCardProps[] = useMemo(() => {
    if (!response?.body) {
      return;
    }

    const keys = [...Object.keys(response.body), "password"];
    return keys.map((key) => {
      return {
        primaryText: t(`INFORMATIONS_${key.toUpperCase()}_CARD_PRIMARY_TEXT`),
        secondaryText: response.body[key],
        actions:
          key !== "country"
            ? [
                {
                  name: t("INFORMATIONS_CHANGE_BUTTON"),
                  onClick: () =>
                    router.push(
                      `/account/informations/change-${key.replaceAll("_", "-")}`
                    ),
                },
              ]
            : undefined,
      };
    });
  }, [response]);

  if (response.isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <PageStructure title="Informations" backButton={router.back}>
      <DataCards cn="mb-[8px]" data={data} />
      <SmallButton
        value="Delete"
        onClick={() => router.push("/account/informations/delete-your-account")}
        valueCN="text-[#E64848]"
      />
    </PageStructure>
  );
};

export default Informations;
