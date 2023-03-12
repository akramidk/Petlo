import { Pressable } from "react-native";
import { BaseButtonProps } from "../../interfaces";
import { useSettingsContext } from "../../hooks";
import clsx from "clsx";

const BaseButton = (props: BaseButtonProps) => {
  const { direction } = useSettingsContext();

  return (
    <Pressable
      className={clsx(
        direction === "ltr" || props?.preventRTL
          ? "flex-row"
          : "flex-row-reverse",
        props?.cn
      )}
      onPress={props.onClick}
      {...props}
    />
  );
};

export default BaseButton;
