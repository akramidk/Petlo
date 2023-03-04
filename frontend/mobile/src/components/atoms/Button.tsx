import { Pressable, Text } from "react-native";
import { ButtonProps } from "../../interfaces";

const Button = ({ value, onClick }: ButtonProps) => {
  return (
    <Pressable
      className="h-[60px] bg-[#76C7C9] rounded-[4px] items-center justify-center"
      onPress={onClick}
    >
      <Text className="text-[#0E333C] text-[15px] font-e800">{value}</Text>
    </Pressable>
  );
};

export default Button;
