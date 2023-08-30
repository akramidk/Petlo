import { useRouter, useLocalSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { Loading } from "../../src/components/pages";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useAPIMutation,
  useTranslationsContext,
} from "../../src/hooks";
import { NextShipmentDateAfterTheSkipResponse } from "../../src/interfaces";

const Skip = () => {
  const router = useRouter();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();
  const { t } = useTranslationsContext();

  const { response } = useAPIFetching<
    void,
    NextShipmentDateAfterTheSkipResponse
  >({
    endpoint: Endpoints.NEXT_SHIPMENT_DATE_AFTER_THE_SKIP,
    slugs: {
      publicId: publicId,
    },
  });

  const { trigger, status } = useAPIMutation<void, void>({
    endpoint: Endpoints.SKIP_AUTOSHIP,
    method: "PATCH",
    options: {
      onSucceeded: router.back,
      fireOnSucceededAfter: 1000,
    },
    slugs: {
      publicId: publicId,
    },
  });

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("SKIP_AUTOSHIP__TITLE")}
      helperText={t("SKIP_AUTOSHIP__HELPER_TEXT", {
        date: response.body.date.split("-").reverse().join("-"),
      })}
      button={{
        value: t("SKIP_AUTOSHIP__BUTTON"),
        onClick: () => trigger(undefined),
        status: status,
        cn: status ? "" : "bg-[#E64848]",
      }}
      link={{
        value: t("COMMON__CANCEL"),
        onClick: router.back,
        status: status ? "inactive" : "active",
      }}
    />
  );
};

export default Skip;
