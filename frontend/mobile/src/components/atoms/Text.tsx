import React from "react";
import { Text as ReactText, TextProps } from "react-native";
import { useSettingsContext } from "../../hooks";

const Text = (props: TextProps) => {
  const { direction } = useSettingsContext();

  return (
    <ReactText
      className={direction === "ltr" ? "self-start" : "self-end"}
      {...props}
    />
  );
};

export default Text;
