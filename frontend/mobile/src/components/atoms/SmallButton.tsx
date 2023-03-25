import clsx from "clsx";
import { BaseButtonProps } from "../../interfaces";
import BaseButton from "../bases/BaseButton";
import Text from "../atoms/Text";

interface SmallButtonProps extends Pick<BaseButtonProps, "onClick" | "cn"> {
  value: string;
  valueCN?: string;
}

const SmallButton = ({ value, onClick, cn, valueCN }: SmallButtonProps) => {
  return (
    <BaseButton
      cn={clsx(
        "w-full border-[1px] border-[#f6f6f6] rounded-[4px] px-[20px] py-[14px] justify-center",
        cn
      )}
      onClick={onClick}
    >
      <Text font="bold" cn={clsx("text-[14px]", valueCN)}>
        {value}
      </Text>
    </BaseButton>
  );
};

export default SmallButton;
