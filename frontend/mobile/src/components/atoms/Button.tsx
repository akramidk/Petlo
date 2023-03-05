import { Pressable } from "react-native";
import { ButtonProps } from "../../interfaces";
import Text from "./Text";

const Button = ({ value, onClick }: ButtonProps) => {
  return (
    <Pressable
      className="h-[60px] bg-[#76C7C9] rounded-[4px] justify-center"
      onPress={onClick}
    >
      <Text
        cn="text-[#0E333C] text-[15px] self-center"
        font={["font-e800", "font-a700"]}
      >
        {value}
      </Text>
    </Pressable>
  );
};

export default Button;
