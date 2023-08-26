import Text from "../atoms/Text";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import clsx from "clsx";
import BaseButton from "./BaseButton";
import { font } from "../../types";
import { View } from "react-native";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";

interface BaseOptionProps {
  value: string | React.ReactNode;
  selected?: boolean;
  onClick: () => void;
  cn?: string;
  valueCn?: string;
  valueFont?: font;
  disable?: boolean;
  helperText?: string;
}

const BaseOption = ({
  value,
  selected = false,
  onClick,
  cn,
  valueCn,
  valueFont,
  disable = false,
  helperText,
}: BaseOptionProps) => {
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  return (
    <BaseButton
      cn={clsx("justify-between items-center", cn, { ["opacity-50"]: disable })}
      onClick={disable ? undefined : onClick}
    >
      {typeof value === "string" ? (
        <View>
          <Text
            cn={clsx("text-[16px] text-[#163E48]", valueCn)}
            font={valueFont ?? "bold"}
          >
            {value}
          </Text>

          {helperText && (
            <Text
              cn={clsx(
                "text-[16px] text-[#163E48] mt-[4px] w-[200px]",
                valueCn
              )}
              font={valueFont ?? "medium"}
            >
              ({t(helperText)})
            </Text>
          )}
        </View>
      ) : (
        value
      )}

      {!disable && (
        <CheckCircleIcon size="22" color={selected ? "#76C7C9" : "#f6f6f6"} />
      )}
    </BaseButton>
  );
};

export default BaseOption;
