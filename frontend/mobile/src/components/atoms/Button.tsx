import clsx from "clsx";
import { Pressable } from "react-native";
import { ButtonProps } from "../../interfaces";
import Text from "./Text";

const Button = ({ value, status = "active", onClick }: ButtonProps) => {
  return (
    <Pressable
      className={clsx(
        "h-[60px] rounded-[4px] justify-center",
        status === "active" ? "bg-[#76C7C9]" : "bg-[#f6f6f6]"
      )}
      onPress={onClick}
    >
      <Text
        cn={clsx(
          "text-[15px] self-center",
          status === "active" ? "text-[#0E333C]" : "text-[#888888]"
        )}
        font={["font-e800", "font-a700"]}
      >
        {value}
      </Text>
    </Pressable>
  );
};

export default Button;
