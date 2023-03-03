import { Pressable, View } from "react-native";
import Text from "./Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";

interface OptionProps {
  id: number;
  value: string;
  onPress: () => void;
  selected?: boolean;
}

const Option = ({ id, onPress, value, selected = false }: OptionProps) => {
  return (
    <Pressable
      key={id}
      className="flex-row justify-between bg-[#fff] pb-[16px] h-[72px]"
      onPress={onPress}
    >
      <Text className="font-e700 text-[16px] text-[#163E48]">{value}</Text>

      <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
    </Pressable>
  );
};

export default Option;
