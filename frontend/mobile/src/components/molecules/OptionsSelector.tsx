import clsx from "clsx";
import { View } from "react-native";
import Option from "../atoms/Option";

interface OptionsSelector {
  options: {
    id: number;
    value: string;
  }[];
  className?: string;
  signalSelect?: {
    selectedOption: number | string;
    setSelectedOption: (id: number | string) => void;
  };
}

const OptionsSelector = ({
  options,
  className,
  signalSelect,
}: OptionsSelector) => {
  const onSelectOption = (id: number) => {
    if (signalSelect) {
      signalSelect.setSelectedOption(id);
    }
  };

  return (
    <View className={clsx("divide-y divide-[#f6f6f6]", className)}>
      {options.map((option, index) => {
        let isSelected: boolean;
        if (signalSelect) {
          isSelected = signalSelect.selectedOption === option.id;
        }

        const padding: string = index === 0 ? "pb-[16px]" : "py-[16px]";

        return (
          <View key={option.id}>
            <Option
              cn={padding}
              selected={isSelected}
              onPress={() => onSelectOption(option.id)}
              value={option.value}
            />
          </View>
        );
      })}
    </View>
  );
};

export default OptionsSelector;
