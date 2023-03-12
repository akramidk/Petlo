import Text from "../atoms/Text";
import { BaseOption, BaseSelectorProps } from "../../interfaces";
import { useSettingsContext, useTranslationsContext } from "../../hooks";
import clsx from "clsx";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import BaseButton from "./BaseButton";

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
    <BaseButton
      cn={clsx(
        "bg-[#F6F6F6] h-[60px] rounded-[4px] justify-between items-center px-[20px]",
        showDropdownIcon && "space-x-[12px]",
        cn
      )}
      onClick={() => setOptionsModalVisible(true)}
      preventRTL={preventRTL}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className={clsx(
          language === "en" ? "font-e500" : "font-a400",
          direction === "ltr" ? "text-left" : "text-right",
          value ? "text-[#444]" : "text-[#aaa]"
        )}
        font="extraBold"
      >
        {(translate && value ? t(value) : value) ?? placeholder}
      </Text>

      {showDropdownIcon ? (
        <ChevronDownIcon color="#0E333C" size={20} strokeWidth={2} />
      ) : (
        <Text
          className={clsx(
            "text-[#0E333C] text-[14px]",
            language === "en" && "tracking-[1px]"
          )}
          font="bold"
        >
          {value ? t("SELECTOR_COMP_CHANGE") : t("SELECTOR_COMP_SELECT")}
        </Text>
      )}
    </BaseButton>
  );
};

export default BaseSelector;
