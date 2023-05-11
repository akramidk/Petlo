import Text from "../atoms/Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import clsx from "clsx";
import BaseButton from "./BaseButton";
import { font } from "../../types";

interface BaseOptionProps {
  value: string | React.ReactNode;
  selected?: boolean;
  onClick: () => void;
  cn?: string;
  valueCn?: string;
  valueFont?: font;
}

const BaseOption = ({
  value,
  selected = false,
  onClick,
  cn,
  valueCn,
  valueFont,
}: BaseOptionProps) => {
  return (
    <BaseButton cn={clsx("justify-between", cn)} onClick={onClick}>
      {typeof value === "string" ? (
        <Text
          cn={clsx("text-[16px] text-[#163E48]", valueCn)}
          font={valueFont ?? "bold"}
        >
          {value}
        </Text>
      ) : (
        value
      )}

      <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
    </BaseButton>
  );
};

export default BaseOption;
