import { Pressable } from "react-native";
import Text from "../atoms/Text";
import { BaseOption, BaseSelectorProps } from "../../interfaces";
import { useSettingsContext, useTranslationsContext } from "../../hooks";
import clsx from "clsx";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const BaseSelector = <T extends BaseOption>({
  placeholder,
  value,
  translate = false,
  cn,
  setOptionsModalVisible,
  showDropdownIcon = false,
  preventRTL = false,
}: BaseSelectorProps<T>) => {
  const { t } = useTranslationsContext();
  const { language, direction } = useSettingsContext();

  return (
    <Pressable
      className={clsx(
        "bg-[#F6F6F6] h-[60px] rounded-[4px] justify-between items-center px-[20px] space-x-[12px]",
        direction === "ltr" || preventRTL ? "flex-row" : "flex-row-reverse",
        cn
      )}
      onPress={() => setOptionsModalVisible(true)}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={clsx(
          language === "en" ? "font-e500" : "font-a400",
          direction === "ltr" ? "text-left" : "text-right",
          value?.value ? "text-[#444]" : "text-[#aaa]"
        )}
        font={["font-e800", "font-a700"]}
      >
        {(translate && value ? t(value?.value) : value?.value) ?? placeholder}
      </Text>

      {showDropdownIcon ? (
        <ChevronDownIcon color="#0E333C" size={20} strokeWidth={2} />
      ) : (
        <Text
          className={clsx(
            "text-[#0E333C] text-[14px]",
            language === "en" && "tracking-[1px]"
          )}
          font={["font-e700", "font-a600"]}
        >
          {value ? t("SELECTOR_COMP_CHANGE") : t("SELECTOR_COMP_SELECT")}
        </Text>
      )}
    </Pressable>
  );
};

export default BaseSelector;
