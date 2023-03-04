import { Pressable, View } from "react-native";
import Text from "./Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import clsx from "clsx";

interface OptionProps {
  value: string;
  onPress: () => void;
  selected?: boolean;
  cn?: string;
}

const Option = ({ onPress, value, selected = false, cn }: OptionProps) => {
  return (
    <Pressable
      className={clsx("flex-row justify-between", cn)}
      onPress={onPress}
    >
      <Text className="font-e700 text-[16px] text-[#163E48]">{value}</Text>

      <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
    </Pressable>
  );
};

export default Option;
