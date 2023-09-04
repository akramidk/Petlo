import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../src/hooks";
import { BaseButton } from "../src/components/bases";
import { Icon, Text } from "../src/components/atoms";
import * as Clipboard from "expo-clipboard";
import { View } from "react-native";
import { useEffect, useState } from "react";
import clsx from "clsx";

const PHONE_NUMBER = "+962790174799";

export const CopyPhoneNumberButton = () => {
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

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
      <View
        className={clsx(
          "flex items-center",
          direction === "ltr" ? "flex-row" : "flex-row-reverse"
        )}
      >
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

        <Text
          font="bold"
          cn={clsx(
            "text-[#666] text-[14px]",
            direction === "ltr" ? "ml-[8px]" : "mr-[8px]"
          )}
        >
          {t("COMMON__COPY_PHONE_NUMBER")}
        </Text>
      </View>
    </BaseButton>
  );
};
