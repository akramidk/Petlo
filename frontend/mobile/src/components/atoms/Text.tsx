import React from "react";
import { Text as ReactText, TextProps } from "react-native";
import { useSettingsContext } from "../../hooks";

const Text = (props: TextProps) => {
  const { direction } = useSettingsContext();
  const textAlign = direction === "ltr" ? "left" : "right";

  return <ReactText style={{ textAlign: textAlign }} {...props} />;
};

export default Text;
