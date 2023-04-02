import clsx from "clsx";
import React from "react";
import { Text as ReactText, TextProps as ReactTextProps } from "react-native";
import { useInternationalizationContext } from "../../hooks";

interface TextProps extends ReactTextProps {
  font?:
    | "extraLight"
    | "light"
    | "regular"
    | "medium"
    | "semiBold"
    | "bold"
    | "extraBold";
  cn?: string;
  specificCN?: {
    languages?: Record<"en" | "ar", string>;
    directions?: Record<"ltr" | "rtl", string>;
  };
}

const Text = (props: TextProps) => {
  const { languageWithoutGender, direction } = useInternationalizationContext();

  const fonts = {
    ar: {
      extraLight: "font-a100",
      light: "font-a200",
      regular: "font-a300",
      medium: "font-a400",
      semiBold: "font-a500",
      bold: "font-a600",
      extraBold: "font-a700",
    },
    en: {
      extraLight: "font-e200",
      light: "font-e300",
      regular: "font-e400",
      medium: "font-e500",
      semiBold: "font-e600",
      bold: "font-e700",
      extraBold: "font-e800",
    },
  };

  const directions = {
    ltr: "text-left",
    rtl: "text-right",
  };

  return (
    <ReactText
      className={clsx(
        directions[direction],
        fonts[languageWithoutGender][props.font],
        props?.specificCN?.directions?.[direction],
        props?.specificCN?.languages?.[languageWithoutGender],
        props?.cn
      )}
      {...props}
    />
  );
};

export default Text;
