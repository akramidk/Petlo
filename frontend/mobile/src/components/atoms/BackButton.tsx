import clsx from "clsx";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "react-native-heroicons/outline";
import { useInternationalizationContext } from "../../hooks";
import BaseButton from "../bases/BaseButton";
import { BaseButtonProps } from "../../interfaces";

const BackButton = ({
  onClick,
  cn,
}: Pick<BaseButtonProps, "onClick" | "cn">) => {
  const { direction } = useInternationalizationContext();

  const arrowStyles = {
    color: "#666",
    size: 20,
    strokeWidth: 2,
  };

  return (
    <BaseButton
      cn={clsx(
        "space-x-[4px] p-[10px] rounded-[8px] bg-[#f6f6f6] items-center",
        direction === "ltr" ? "self-start" : "self-end",
        cn
      )}
      onClick={onClick}
    >
      {direction === "ltr" ? (
        <ArrowSmallLeftIcon {...arrowStyles} />
      ) : (
        <ArrowSmallRightIcon {...arrowStyles} />
      )}
    </BaseButton>
  );
};

export default BackButton;
