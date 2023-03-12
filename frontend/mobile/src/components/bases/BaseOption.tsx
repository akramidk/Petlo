import { Pressable, View } from "react-native";
import Text from "../atoms/Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import clsx from "clsx";
import { useSettingsContext } from "../../hooks";

interface BaseOptionProps {
  value: string;
  onPress: () => void;
  selected?: boolean;
  cn?: string;
}

const BaseOption = ({
  onPress,
  value,
  selected = false,
  cn,
}: BaseOptionProps) => {
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
      <Text cn="text-[16px] text-[#163E48]" font="bold">
        {value}
      </Text>

      <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
    </Pressable>
  );
};

export default BaseOption;
