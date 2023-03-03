import { View } from "react-native";
import clsx from "clsx";
import { useTranslationsContext } from "../src/hooks";
import { Text } from "../src/components/atoms";

const SelectLanguage = () => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <View className="space-y-[28px]">
        <View>
          <Text className={clsx("font-e800 text-[32px] text-[#0E333C]")}>
            {t("SELECT_LANGUAGE_TITLE")}
          </Text>

          <Text
            className={clsx(
              "font-e500 text-[17px] text-[#888] leading-[28px] mt-[12px]"
            )}
          >
            {t("SELECT_LANGUAGE_HELPER_TEXT")}
          </Text>
        </View>

        <View>
          <Text className="">Text</Text>
        </View>
      </View>
    </View>
  );
};

export default SelectLanguage;
