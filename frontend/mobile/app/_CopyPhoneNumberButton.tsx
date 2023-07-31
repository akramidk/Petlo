import { useTranslationsContext } from "../src/hooks";
import { BaseButton } from "../src/components/bases";
import { Icon, Text } from "../src/components/atoms";
import * as Clipboard from "expo-clipboard";
import { View } from "react-native";
import { useEffect, useState } from "react";

const PHONE_NUMBER = "+962790119952";

export const CopyPhoneNumberButton = () => {
  const { t } = useTranslationsContext();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked === false) return;
    const timeout = setTimeout(() => setClicked(false), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [clicked]);

  return (
    <BaseButton
      cn="bg-[#fff] px-[32px] py-[20px] rounded-full shadow-sm border-[1px] border-[#eee]"
      onClick={async () => {
        setClicked(true);
        await Clipboard.setStringAsync(PHONE_NUMBER);
      }}
    >
      <View className="flex flex-row items-center space-x-[8px]">
        {clicked ? (
          <Icon
            name="checkMark"
            solid={false}
            size={18}
            color="#76C7C9"
            strokeWidth={3.4}
          />
        ) : (
          <Icon
            name="clipboard"
            strokeWidth={2.2}
            solid={false}
            size={18}
            color="#666"
          />
        )}

        <Text font="bold" cn="text-[#666] text-[14px]">
          {t("COMMON__COPY_PHONE_NUMBER")}
        </Text>
      </View>
    </BaseButton>
  );
};
