import { View, Pressable } from "react-native";
import Text from "./Text";
import { OptionBase } from "../../interfaces";
import { useSettingsContext, useTranslationsContext } from "../../hooks";
import clsx from "clsx";

interface BaseSelectorProps<T> {
  placeholder?: string;
  value: T | undefined;
  translate?: boolean;
  cn?: string;
  setOptionsModalVisible: (visible: boolean) => void;
}

const BaseSelector = <T extends OptionBase>({
  placeholder,
  value,
  translate = false,
  cn,
  setOptionsModalVisible,
}: BaseSelectorProps<T>) => {
  const { t } = useTranslationsContext();
  const { language, direction } = useSettingsContext();

  return (
    <View
      className={clsx(
        "bg-[#F6F6F6] h-[60px] rounded-[4px] justify-between items-center",
        direction === "ltr" ? "flex-row" : "flex-row-reverse",
        cn
      )}
    >
      <Text
        className={clsx(
          "p-[20px]",
          language === "en" ? "font-e500" : "font-a400",
          direction === "ltr" ? "text-left" : "text-right",
          value?.value ? "text-[#444]" : "text-[#aaa]"
        )}
        font={["font-e800", "font-a700"]}
      >
        {(translate && value ? t(value?.value) : value?.value) ?? placeholder}
      </Text>

      <Pressable
        className="h-full justify-center p-[20px]"
        onPress={() => setOptionsModalVisible(true)}
      >
        <Text
          className={clsx(
            "text-[#0E333C] text-[14px]",
            language === "en" && "tracking-[1px]"
          )}
          font={["font-e700", "font-a600"]}
        >
          {value ? t("SELECTOR_COMP_CHANGE") : t("SELECTOR_COMP_SELECT")}
        </Text>
      </Pressable>
    </View>
  );
};

export default BaseSelector;
