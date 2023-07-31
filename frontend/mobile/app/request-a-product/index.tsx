import { useRouter } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { CopyPhoneNumberButton } from "../_CopyPhoneNumberButton";

const RequestAProduct = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("REQUEST_A_PRODUCT__TITLE")}
      helperText={t("REQUEST_A_PRODUCT__HELPER_TEXT")}
      backButton={router.back}
      floatingElement={<CopyPhoneNumberButton />}
    />
  );
};

export default RequestAProduct;
