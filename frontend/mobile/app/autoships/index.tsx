import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
import { DataCards, PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching, useTranslationsContext } from "../../src/hooks";
import { DataCardProps } from "../../src/interfaces";
import { AutoshipsResponse } from "../../src/interfaces/Endpoints/Autoships";
import { Loading } from "../../src/components/pages";

const Autoships = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { response } = useAPIFetching<void, AutoshipsResponse>({
    endpoint: Endpoints.AUTOSHIPS,
    options: {
      withPagination: true,
    },
  });

  const autoships: DataCardProps[] = useMemo(() => {
    if (response.isFetching) return [];

    return response.body.data.map((autoship) => {
      return {
        primaryText: autoship.name,
        secondaryText: `${t(
          "AUTOSHIPS__NEXT_SHIPMENT_ON"
        )} ${autoship.next_shipment_on.split("-").reverse().join("-")}`,
        actions: [
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_NAME"),
            onClick: () => router.push("/autoships/change-name"),
          },
          { name: t("AUTOSHIPS__ACTIONS.CHANGE_ADDRESS"), onClick: () => {} },
          { name: t("AUTOSHIPS__ACTIONS.CHANGE_ITEMS"), onClick: () => {} },
          {
            name: t("AUTOSHIPS__ACTIONS.CHANGE_PAYMENT_INFORMATION"),
            onClick: () => {},
          },
          { name: t("AUTOSHIPS__ACTIONS.CHANGE_PETS"), onClick: () => {} },
          { name: t("AUTOSHIPS__ACTIONS.CHANGE_PETS"), onClick: () => {} },
        ],
      };
    });
  }, [response]);

  if (response === undefined || response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("AUTOSHIPS__TITLE")}
      floatingElement={
        <BaseButton
          cn="bg-[#6BADAE] px-[32px] py-[20px] rounded-full shadow-lg"
          onClick={() => router.push("/autoships/create-new-autoship")}
        >
          <Text font="bold" cn="text-[#fff] text-[14px]">
            {t("AUTOSHIPS__CREATE_AN_AUTOSHIP")}
          </Text>
        </BaseButton>
      }
    >
      <DataCards data={autoships} />
    </PageStructure>
  );
};

export default Autoships;
