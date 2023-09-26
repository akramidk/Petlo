import { Text } from "../src/components/atoms";
import { BaseButton } from "../src/components/bases";
import * as Linking from "expo-linking";
import { useTranslationsContext } from "../src/hooks";

const PHONE_NUMBER = "+962790174799";

export const OpenWhatsappButton = () => {
  const { t } = useTranslationsContext();

  return (
    <BaseButton
      onClick={() => Linking.openURL(`whatsapp://send?phone=${PHONE_NUMBER}`)}
    >
      <Text font="bold" cn="text-[14px] text-[#888]">
        {t("COMMON__OR_OPEN_IN_WHATSAPP")}
      </Text>
    </BaseButton>
  );
};
