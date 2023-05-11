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
  multipleSelect,
}: OptionsProps<T>) => {
  const { t } = useTranslationsContext();

  const selectOption = (option: T) => {
    if (signalSelect) {
      signalSelect.setSelectedOption(option);
    } else if (multipleSelect) {
      const options = multipleSelect.selectedOptions
        ? [...multipleSelect.selectedOptions, option]
        : [option];

      multipleSelect.setSelectedOptions(options);
    }
  };

  const deselectOption = (option: T) => {
    if (signalSelect) {
      signalSelect.setSelectedOption(undefined);
    } else if (multipleSelect) {
      const options = multipleSelect.selectedOptions.filter(
        (_option) => _option.id !== option.id
      );
      multipleSelect.setSelectedOptions(options);
    }
  };

  return (
    <View className={clsx("divide-y divide-[#f6f6f6]", cn)}>
      {options.map((option, index) => {
        let isSelected: boolean;
        if (signalSelect) {
          isSelected = signalSelect.selectedOption?.id === option.id;
        } else if (multipleSelect) {
          isSelected = !!multipleSelect.selectedOptions?.find(
            (item) => item.id === option.id
          );
        }

        const padding: string = index === 0 ? "pb-[16px]" : "py-[16px]";

        return (
          <View key={option.id}>
            <BaseOption
              cn={clsx(padding, optionCN)}
              selected={isSelected}
              onClick={() =>
                isSelected ? deselectOption(option) : selectOption(option)
              }
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
