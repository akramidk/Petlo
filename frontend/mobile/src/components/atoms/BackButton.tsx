import { Pressable } from "react-native";
import clsx from "clsx";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "react-native-heroicons/outline";
import { useSettingsContext } from "../../hooks";

interface BackButtonProps {
  onClick: () => void;
  cn?: string;
}

const BackButton = ({ onClick, cn }: BackButtonProps) => {
  const { direction } = useSettingsContext();

  const arrowStyles = {
    color: "#666",
    size: 20,
    strokeWidth: 2,
  };

  return (
    <Pressable
      className={clsx(
        "space-x-[4px] p-[10px] rounded-[8px] bg-[#f6f6f6] items-center",
        direction === "ltr" ? "self-start" : "self-end",
        cn
      )}
      onPress={onClick}
    >
      {direction === "ltr" ? (
        <ArrowSmallLeftIcon {...arrowStyles} />
      ) : (
        <ArrowSmallRightIcon {...arrowStyles} />
      )}
    </Pressable>
  );
};

export default BackButton;
