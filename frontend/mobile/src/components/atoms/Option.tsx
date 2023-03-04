import { Pressable, View } from "react-native";
import Text from "./Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import clsx from "clsx";
import { useSettingsContext } from "../../hooks";

interface OptionProps {
  value: string;
  onPress: () => void;
  selected?: boolean;
  cn?: string;
}

const Option = ({ onPress, value, selected = false, cn }: OptionProps) => {
  const { direction } = useSettingsContext();

  return (
    <Pressable
      className={clsx(
        "justify-between",
        direction === "ltr" ? "flex-row" : "flex-row-reverse",
        cn
      )}
      onPress={onPress}
    >
      <Text className="font-e700 text-[16px] text-[#163E48]">{value}</Text>

      <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
    </Pressable>
  );
};

export default Option;
