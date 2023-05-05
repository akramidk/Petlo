import Text from "../atoms/Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import clsx from "clsx";
import BaseButton from "./BaseButton";
import { font } from "../../types";

interface BaseOptionProps {
  value: string;
  selected?: boolean;
  onSelect: () => void;
  cn?: string;
  valueCn?: string;
  valueFont?: font;
}

const BaseOption = ({
  value,
  selected = false,
  onSelect,
  cn,
  valueCn,
  valueFont,
}: BaseOptionProps) => {
  return (
    <BaseButton cn={clsx("justify-between", cn)} onClick={onSelect}>
      <Text
        cn={clsx("text-[16px] text-[#163E48]", valueCn)}
        font={valueFont ?? "bold"}
      >
        {value}
      </Text>

      <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
    </BaseButton>
  );
};

export default BaseOption;
