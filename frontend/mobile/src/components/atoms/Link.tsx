import clsx from "clsx";
import BaseButton from "../bases/BaseButton";
import Text from "./Text";
import { ActivityIndicator } from "react-native-paper";
import { CheckIcon, XMarkIcon } from "react-native-heroicons/outline";

interface LinkProps {
  onClick: () => void;
  value: string;
  status?: "active" | "inactive" | "loading" | "succeeded" | "failed";
}

const Link = ({ onClick, status = "active", value }: LinkProps) => {
  const icons = {
    loading: <ActivityIndicator animating={true} color="#0E333C" size={14} />,
    succeeded: <CheckIcon color="#76C7C9" size={20} strokeWidth={3} />,
    failed: <XMarkIcon color="#E64848" size={20} strokeWidth={3} />,
  };

  return (
    <BaseButton
      cn="space-x-[8px]"
      onClick={onClick}
      disabled={status !== "active"}
    >
      {icons[status]}

      <Text
        cn={clsx(
          "text-[14px]",
          status === "active" ? "text-[#222]" : "text-[#888]"
        )}
        font="extraBold"
      >
        {value}
      </Text>
    </BaseButton>
  );
};

export default Link;
