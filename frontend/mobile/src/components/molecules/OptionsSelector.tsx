import clsx from "clsx";
import { View } from "react-native";
import { useTranslationsContext } from "../../hooks";
import Option from "../atoms/Option";

interface OptionBase {
  id: number | string;
  value: string;
}

interface OptionsSelector<T> {
  options: T[];
  className?: string;
  translate?: boolean;
  signalSelect?: {
    selectedOption: T;
    setSelectedOption: (option: T) => void;
  };
}

const OptionsSelector = <T extends OptionBase>({
  options,
  className,
  translate = false,
  signalSelect,
}: OptionsSelector<T>) => {
  const { t } = useTranslationsContext();

  const onSelectOption = (option: T) => {
    if (signalSelect) {
      signalSelect.setSelectedOption(option);
    }
  };

  return (
    <View className={clsx("divide-y divide-[#f6f6f6]", className)}>
      {options.map((option, index) => {
        let isSelected: boolean;
        if (signalSelect) {
          isSelected = signalSelect.selectedOption?.id === option.id;
        }

        const padding: string = index === 0 ? "pb-[16px]" : "py-[16px]";

        return (
          <View key={option.id}>
            <Option
              cn={padding}
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
