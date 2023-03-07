import { View } from "react-native";
import Text from "./Text";
import { LabelProps } from "../../interfaces";

const Label = ({ name, helperText, require }: LabelProps) => {
  return (
    <View className="flex-row space-x-[2px]">
      <Text cn="text-[14px] text-[#0E333C]" font={["font-e700", "font-a600"]}>
        {name}
      </Text>
      {require && (
        <Text cn="text-[14px] text-[#0E333C]" font={["font-e700", "font-a600"]}>
          *
        </Text>
      )}
      {helperText && (
        <Text cn="text-[14px] text-[#0E333C]" font={["font-e700", "font-a600"]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default Label;
