import { useTranslationsContext } from "../src/hooks";
import { BaseButton } from "../src/components/bases";
import { Icon, Text } from "../src/components/atoms";
import * as Clipboard from "expo-clipboard";
import { View } from "react-native";

export const CopyPhoneNumberButton = () => {
  const { t } = useTranslationsContext();

  return (
    <BaseButton
      cn="bg-[#fff] px-[32px] py-[20px] rounded-full shadow-sm border-[1px] border-[#eee]"
      onClick={async () => await Clipboard.setStringAsync("+962790119952")}
    >
      <View className="flex flex-row items-center space-x-[8px]">
        <Icon
          name="clipboard"
          strokeWidth={2}
          solid={false}
          size={18}
          color="#666"
        />

        <Text font="bold" cn="text-[#666] text-[14px]">
          {t("COMMON__COPY_PHONE_NUMBER")}
        </Text>
      </View>
    </BaseButton>
  );
};
