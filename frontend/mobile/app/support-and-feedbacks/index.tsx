import { useRouter } from "expo-router";
import { PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { CopyPhoneNumberButton } from "../_CopyPhoneNumberButton";

const SupportAndFeedbacks = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("SUPPORT_AND_FEEDBACKS__TITLE")}
      helperText={t("SUPPORT_AND_FEEDBACKS__HELPER_TEXT")}
      backButton={router.back}
      floatingElement={<CopyPhoneNumberButton />}
    />
  );
};

export default SupportAndFeedbacks;
