import clsx from "clsx";
import BaseButton from "../bases/BaseButton";
import Text from "./Text";
import { ActivityIndicator } from "react-native-paper";
import { CheckIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useInternationalizationContext } from "../../hooks";
import { View } from "react-native";
import { LinkProps } from "../../interfaces";

const Link = ({
  onClick,
  status = "active",
  value,
  cn,
  valueCN,
  font = "extraBold",
  hideValueIfNotActive = false,
}: LinkProps) => {
  const { direction } = useInternationalizationContext();

  const icons = {
    loading: <ActivityIndicator animating={true} color="#0E333C" size={14} />,
    succeeded: <CheckIcon color="#76C7C9" size={18} strokeWidth={3} />,
    failed: <XMarkIcon color="#E64848" size={1820} strokeWidth={3} />,
  };

  return (
    <BaseButton
      cn={clsx("items-center", cn)}
      onClick={onClick}
      disabled={status !== "active"}
    >
      {icons[status] && (
        <View className={direction === "ltr" ? "mr-[8px]" : "ml-[8px]"}>
          {icons[status]}
        </View>
      )}

      {(!hideValueIfNotActive || status === "active") && (
        <Text
          cn={clsx(
            "text-[14px]",
            status === "active" ? "text-[#222]" : "text-[#888]",
            valueCN
          )}
          font={font}
        >
          {value}
        </Text>
      )}
    </BaseButton>
  );
};

export default Link;
