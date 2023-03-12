import Text from "../atoms/Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import clsx from "clsx";
import BaseButton from "./BaseButton";

interface BaseOptionProps {
  value: string;
  selected?: boolean;
  onSelect: () => void;
  cn?: string;
}

const BaseOption = ({
  value,
  selected = false,
  onSelect,
  cn,
}: BaseOptionProps) => {
  return (
    <BaseButton cn={clsx("justify-between", cn)} onClick={onSelect}>
      <Text cn="text-[16px] text-[#163E48]" font="bold">
        {value}
      </Text>

      <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
    </BaseButton>
  );
};

export default BaseOption;
