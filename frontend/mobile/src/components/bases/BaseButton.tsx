import { Pressable } from "react-native";
import { BaseButtonProps } from "../../interfaces";
import { useInternationalizationContext } from "../../hooks";
import clsx from "clsx";

const BaseButton = (props: BaseButtonProps) => {
  const { direction } = useInternationalizationContext();

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
