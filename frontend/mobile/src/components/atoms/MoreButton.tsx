import BaseButton from "../bases/BaseButton";
import Text from "../atoms/Text";

interface MoreButton {
  onClick: () => void;
  value: string;
}

const MoreButton = ({ onClick, value }) => {
  return (
    <BaseButton
      cn="w-[100%] bg-[#f6f6f6] rounded-[4px] items-center justify-center p-[12px]"
      onClick={onClick}
    >
      <Text cn="text-[14px] text-[#333]" font="bold">
        {value}
      </Text>
    </BaseButton>
  );
};

export default MoreButton;
