import { useRouter } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";

const Deactivate = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title="Deactivate"
      helperText="Are You Sure?"
      button={{ value: "Yes I'm Sure", onClick: () => {} }}
      link={{
        value: t("COMMON__CANCEL"),
        onClick: router.back,
      }}
    />
  );
};

export default Deactivate;
