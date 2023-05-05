import clsx from "clsx";
import { View } from "react-native";
import { useTranslationsContext } from "../../hooks";
import { BaseOption as BaseOptionProps, OptionsProps } from "../../interfaces";
import BaseOption from "../bases/BaseOption";

const Options = <T extends BaseOptionProps>({
  options,
  cn,
  optionCN,
  translate = false,
  signalSelect,
  optionValueCn,
  optionValueFont,
}: OptionsProps<T>) => {
  const { t } = useTranslationsContext();

  const onSelectOption = (option: T) => {
    if (signalSelect) {
      signalSelect.setSelectedOption(option);
    }
  };

  return (
    <View className={clsx("divide-y divide-[#f6f6f6]", cn)}>
      {options.map((option, index) => {
        let isSelected: boolean;
        if (signalSelect) {
          isSelected = signalSelect.selectedOption?.id === option.id;
        }

        const padding: string = index === 0 ? "pb-[16px]" : "py-[16px]";

        return (
          <View key={option.id}>
            <BaseOption
              cn={clsx(padding, optionCN)}
              selected={isSelected}
              onSelect={() => onSelectOption(option)}
              value={translate ? t(option.value) : option.value}
              valueCn={optionValueCn}
              valueFont={optionValueFont}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Options;
