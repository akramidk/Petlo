import { View } from "react-native";
import clsx from "clsx";
import { useTranslationsContext } from "../src/hooks";
import Option from "../src/components/atoms/Option";
import Text from "../src/components/atoms/Text";

const SelectLanguage = () => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <View className="space-y-[28px]">
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

        <View>
          <Option id={1} onPress={() => {}} value="test" />
          <Option id={1} onPress={() => {}} value="test" selected />
        </View>
      </View>
    </View>
  );
};

export default SelectLanguage;
