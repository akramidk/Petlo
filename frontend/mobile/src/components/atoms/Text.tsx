import clsx from "clsx";
import React from "react";
import { Text as ReactText, TextProps as ReactTextProps } from "react-native";
import { useSettingsContext } from "../../hooks";

interface TextProps {
  font: string[];
  children: string;
  cn?: string;
}

const Text = ({ font, children, cn }: TextProps) => {
  const { language, direction } = useSettingsContext();

  return (
    <ReactText
      className={clsx(
        direction === "ltr" ? "text-left" : "text-right",
        language === "en" ? font[0] : font[1],
        cn
      )}
    >
      {children}
    </ReactText>
  );
};

export default Text;
