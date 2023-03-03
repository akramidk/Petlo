import { View } from "react-native";
import Option from "../atoms/Option";

interface OptionsSelector {
  options: {
    id: number;
    value: string;
  }[];
  className?: string;
  signalSelect?: {
    selectedOption: number;
    setSelectedOption: (id: number) => void;
  };
}

const OptionsSelector = ({
  options,
  className,
  signalSelect,
}: OptionsSelector) => {
  const onSelectOption = (id: number, isSelected: boolean) => {
    if (signalSelect) {
      signalSelect.setSelectedOption(id);
    }
  };

  return (
    <View className={className}>
      {options.map((option) => {
        let isSelected: boolean;

        if (signalSelect) {
          isSelected = signalSelect.selectedOption === option.id;
        }

        return (
          <View key={option.id}>
            <Option
              {...option}
              selected={isSelected}
              onPress={() => onSelectOption(option.id, isSelected)}
            />
          </View>
        );
      })}
    </View>
  );
};

export default OptionsSelector;
