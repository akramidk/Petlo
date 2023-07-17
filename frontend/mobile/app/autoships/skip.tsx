import { useRouter, useSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { Loading } from "../../src/components/pages";
import { Endpoints } from "../../src/enums";
import {
  useAPIFetching,
  useAPIMutation,
  useTranslationsContext,
} from "../../src/hooks";

const Skip = () => {
  const router = useRouter();
  const { publicId } = useSearchParams();
  const { t } = useTranslationsContext();

  const { response } = useAPIFetching<void, void>({
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
      title="skip"
      helperText="skip"
      button={{
        value: "yes skip",
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
