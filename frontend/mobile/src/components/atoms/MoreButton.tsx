import BaseButton from "../bases/BaseButton";
import Text from "../atoms/Text";
import clsx from "clsx";

interface MoreButton {
  onClick: () => void;
  value: string;
  cn?: string;
}

const MoreButton = ({ onClick, value, cn }: MoreButton) => {
  return (
    <BaseButton
      cn={clsx(
        "w-[100%] bg-[#f6f6f6] rounded-[4px] items-center justify-center p-[12px]",
        cn
      )}
      onClick={onClick}
    >
      <Text cn="text-[14px] text-[#333]" font="bold">
        {value}
      </Text>
    </BaseButton>
  );
};

export default MoreButton;
