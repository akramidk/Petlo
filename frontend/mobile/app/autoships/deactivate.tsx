import { useRouter, useSearchParams } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIMutation, useTranslationsContext } from "../../src/hooks";

const Deactivate = () => {
  const router = useRouter();
  const { publicId } = useSearchParams();
  const { t } = useTranslationsContext();

  const { trigger, status } = useAPIMutation<void, void>({
    endpoint: Endpoints.DEACTIVATE_AN_AUTOSHIP,
    method: "PATCH",
    options: {
      onSucceeded: router.back,
      fireOnSucceededAfter: 1000,
    },
    slugs: {
      publicId: publicId,
    },
  });

  return (
    <PageStructure
      title="Deactivate"
      helperText="Are You Sure?"
      button={{
        value: "Yes I'm Sure",
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

export default Deactivate;
