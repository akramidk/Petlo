import clsx from "clsx";
import React from "react";
import { Text as ReactText, TextProps as ReactTextProps } from "react-native";
import { useSettingsContext } from "../../hooks";

interface TextProps extends ReactTextProps {
  font: string[];
}

const Text = (props: TextProps) => {
  const { language, direction } = useSettingsContext();

  return (
    <ReactText
      className={clsx(
        direction === "ltr" ? "self-start" : "self-end",
        language === "en" ? props.font[0] : props.font[1]
      )}
      {...props}
    />
  );
};

export default Text;
