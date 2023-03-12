import clsx from "clsx";
import { View } from "react-native";
import { useTranslationsContext } from "../../hooks";
import { OptionBase, OptionsSelectorProps } from "../../interfaces";
import { BaseOption } from "../bases";

const OptionsSelector = <T extends OptionBase>({
  options,
  cn,
  optionCN,
  translate = false,
  signalSelect,
}: OptionsSelectorProps<T>) => {
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
              onPress={() => onSelectOption(option)}
              value={translate ? t(option.value) : option.value}
            />
          </View>
        );
      })}
    </View>
  );
};

export default OptionsSelector;
