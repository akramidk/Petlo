import Text from "../atoms/Text";
import { BaseOption, BaseSelectorProps } from "../../interfaces";
import { useTranslationsContext } from "../../hooks";
import clsx from "clsx";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import BaseButton from "./BaseButton";

const BaseSelector = <T extends BaseOption>({
  placeholder,
  value,
  translate = false,
  cn,
  onClick,
  showDropdownIcon = false,
  preventRTL = false,
}: BaseSelectorProps<T>) => {
  const { t } = useTranslationsContext();

  return (
    <BaseButton
      cn={clsx(
        "bg-[#F6F6F6] h-[60px] rounded-[4px] justify-between items-center px-[20px]",
        showDropdownIcon && "space-x-[12px]",
        cn
      )}
      onClick={() => onClick(true)}
      preventRTL={preventRTL}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        cn={value ? "text-[#444]" : "text-[#aaa]"}
        font="medium"
      >
        {(translate && value ? t(value) : value) ?? placeholder}
      </Text>

      {showDropdownIcon ? (
        <ChevronDownIcon color="#0E333C" size={20} strokeWidth={2} />
      ) : (
        <Text
          cn={"text-[#0E333C] text-[14px]"}
          font="bold"
          specificCN={{
            languages: {
              en: "tracking-[1px]",
              ar: "",
            },
          }}
        >
          {value ? t("SELECTOR_COMP__CHANGE") : t("SELECTOR_COMP__SELECT")}
        </Text>
      )}
    </BaseButton>
  );
};

export default BaseSelector;
