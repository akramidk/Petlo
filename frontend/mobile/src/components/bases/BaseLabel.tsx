import { View, Text } from "react-native";
import { BaseLabelProps } from "../../interfaces";
import { useInternationalizationContext } from "../../hooks";
import clsx from "clsx";

const BaseLabel = ({
  name,
  helperText,
  require,
  cn,
  bottomHelperText,
}: BaseLabelProps) => {
  const { language, direction } = useInternationalizationContext();

  const className = {
    en: {
      name: "font-e700",
      require: "font-e700 ml-[2px]",
      helperText: "font-e500 ml-[4px]",
      bottomHelperText: "font-e500",
    },
    ar_masculine: {
      name: "font-a600",
      require: "font-a600 mr-[2px]",
      helperText: "font-a400 mr-[4px]",
      bottomHelperText: "font-a400",
    },
    ar_feminine: {
      name: "font-a600",
      require: "font-a600 mr-[2px]",
      helperText: "font-a400 mr-[4px]",
      bottomHelperText: "font-a400",
    },
  };

  return (
    <View className={clsx("space-y-[4px]", cn)}>
      <View
        className={clsx(
          "flex-row flex-wrap",
          direction === "ltr" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Text
          className={clsx(
            "text-[14px] text-[#0E333C]",
            className[language].name
          )}
        >
          {name}
        </Text>
        {require && (
          <Text
            className={clsx(
              "text-[14px] text-[#0E333C]",
              className[language].require
            )}
          >
            *
          </Text>
        )}
        {helperText && (
          <Text
            className={clsx(
              "text-[14px] text-[#888]",
              className[language].helperText
            )}
          >
            ({helperText})
          </Text>
        )}
      </View>

      {bottomHelperText && (
        <Text
          className={clsx(
            "text-[14px] text-[#888]",
            className[language].bottomHelperText
          )}
        >
          {bottomHelperText}
        </Text>
      )}
    </View>
  );
};

export default BaseLabel;
