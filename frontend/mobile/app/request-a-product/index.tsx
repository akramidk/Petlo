import { useRouter } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";

const RequestAProduct = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("REQUEST_A_PRODUCT__TITLE")}
      helperText={t("REQUEST_A_PRODUCT__HELPER_TEXT")}
      backButton={router.back}
    />
  );
};

export default RequestAProduct;
