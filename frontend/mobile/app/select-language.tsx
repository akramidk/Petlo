import { View } from "react-native";
import clsx from "clsx";
import { useTranslationsContext } from "../src/hooks";
import Text from "../src/components/atoms/Text";
import { OptionsSelector } from "../src/components/molecules";
import { useState } from "react";

const SelectLanguage = () => {
  const { t } = useTranslationsContext();
  const [selectedLanguage, setSelectedLanguage] = useState<
    undefined | number | string
  >();

  return (
    <View>
      <View>
        <View className="space-y-[12px]">
          <Text className={clsx("font-e800 text-[32px] text-[#0E333C]")}>
            {t("SELECT_LANGUAGE_TITLE")}
          </Text>

          <Text
            className={clsx("font-e500 text-[17px] text-[#888] leading-[28px]")}
          >
            {t("SELECT_LANGUAGE_HELPER_TEXT")}
          </Text>
        </View>

        <OptionsSelector
          options={t("SELECT_LANGUAGE_LANGUAGES")}
          className="mt-[28px]"
          signalSelect={{
            selectedOption: selectedLanguage,
            setSelectedOption: setSelectedLanguage,
          }}
        />
      </View>
    </View>
  );
};

export default SelectLanguage;
