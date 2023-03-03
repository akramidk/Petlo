import React from "react";
import { Text as ReactText } from "react-native";
import { useSettingsContext } from "../../hooks";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text = ({ className, children }: TextProps) => {
  const { direction } = useSettingsContext();
  const textAlign = direction === "ltr" ? "left" : "right";

  return (
    <ReactText style={{ textAlign: textAlign }} className={className}>
      {children}
    </ReactText>
  );
};

export default Text;
