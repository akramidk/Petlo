import { View, Text } from "react-native";
import { LabelProps } from "../../interfaces";
import { useSettingsContext } from "../../hooks";
import clsx from "clsx";

const Label = ({ name, helperText, require, cn }: LabelProps) => {
  const { language, direction } = useSettingsContext();

  const className = {
    en: {
      name: "font-e700",
      require: "font-e700 ml-[2px]",
      helperText: "font-e500 ml-[4px]",
    },
    ar_masculine: {
      name: "font-a600",
      require: "font-a600 mr-[2px]",
      helperText: "font-a400 mr-[4px]",
    },
    ar_feminine: {
      name: "font-a600",
      require: "font-a600 mr-[2px]",
      helperText: "font-a400 mr-[4px]",
    },
  };

  return (
    <View
      className={clsx(
        "flex-row",
        direction === "ltr" ? "flex-row" : "flex-row-reverse",
        cn
      )}
    >
      <Text
        className={clsx("text-[14px] text-[#0E333C]", className[language].name)}
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
  );
};

export default Label;
