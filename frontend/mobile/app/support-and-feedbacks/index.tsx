import { useRouter } from "expo-router";
import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { CopyPhoneNumberButton } from "../_CopyPhoneNumberButton";
import { OpenWhatsappButton } from "../_OpenWhatsappButton";

const SupportAndFeedbacks = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("SUPPORT_AND_FEEDBACKS__TITLE")}
      helperText={t("SUPPORT_AND_FEEDBACKS__HELPER_TEXT")}
      backButton={router.back}
      floatingElement={
        <View className="items-center">
          <CopyPhoneNumberButton />
          <View className="mb-[12px]" />
          <OpenWhatsappButton />
        </View>
      }
    />
  );
};

export default SupportAndFeedbacks;
