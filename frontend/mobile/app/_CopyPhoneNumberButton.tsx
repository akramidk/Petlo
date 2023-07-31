import { useTranslationsContext } from "../src/hooks";
import { BaseButton } from "../src/components/bases";
import { Text } from "../src/components/atoms";
import * as Clipboard from "expo-clipboard";

export const CopyPhoneNumberButton = () => {
  const { t } = useTranslationsContext();

  return (
    <BaseButton
      cn="bg-[#fff] px-[32px] py-[20px] rounded-full shadow-sm border-[1px] border-[#eee]"
      onClick={async () => await Clipboard.setStringAsync("+962790119952")}
    >
      <Text font="bold" cn="text-[#666] text-[14px]">
        {t("COMMON__COPY_PHONE_NUMBER")}
      </Text>
    </BaseButton>
  );
};
