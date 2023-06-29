import { PageStructure } from "../../../src/components/organisms";
import { useTranslationsContext } from "../../../src/hooks";

const SelectDate = () => {
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("CREATE_AN_AUTOSHIP__STEPS.WHEN.PRIMARY_TEXT")}
    ></PageStructure>
  );
};
