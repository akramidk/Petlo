import { useRouter } from "expo-router";
import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { useTranslationsContext } from "../../src/hooks";
import { CopyPhoneNumberButton } from "../_CopyPhoneNumberButton";
import { OpenWhatsappButton } from "../_OpenWhatsappButton";

const RequestAProduct = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();

  return (
    <PageStructure
      title={t("REQUEST_A_PRODUCT__TITLE")}
      helperText={t("REQUEST_A_PRODUCT__HELPER_TEXT")}
      backButton={router.back}
      floatingElement={
        <View className="items-center">
          <CopyPhoneNumberButton />
          <View className="mb-[12px]" />
          <OpenWhatsappButton />
        </View>
      }
    ></PageStructure>
  );
};

export default RequestAProduct;
