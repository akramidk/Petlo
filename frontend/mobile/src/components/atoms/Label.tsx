import { View, Text } from "react-native";
import { LabelProps } from "../../interfaces";
import { useSettingsContext } from "../../hooks";
import clsx from "clsx";

const Label = ({ name, helperText, require }: LabelProps) => {
  const { language, direction } = useSettingsContext();

  const fonts = {
    en: {
      name: "font-e700",
      require: "font-e700",
      helperText: "font-e700",
    },
    ar_masculine: {
      name: "font-a600",
      require: "font-a600",
      helperText: "font-a600",
    },
    ar_feminine: {
      name: "font-a600",
      require: "font-a600",
      helperText: "font-a600",
    },
  };

  return (
    <View
      className={clsx(
        "flex-row",
        direction === "ltr" ? "flex-row" : "flex-row-reverse"
      )}
    >
      <Text
        className={clsx("text-[14px] text-[#0E333C]", fonts[language].name)}
      >
        {name}
      </Text>
      {require && (
        <>
          {
            //rtl
          }
          <Text className="w-[2px]" />
          <Text
            className={clsx("text-[14px] text-[#0E333C]", fonts[language].name)}
          >
            *
          </Text>
        </>
      )}
      {helperText && (
        <Text className="text-[14px] text-[#0E333C]">{helperText}</Text>
      )}
    </View>
  );
};

export default Label;
