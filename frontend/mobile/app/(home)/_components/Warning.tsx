import { View } from "react-native";
import { Text } from "../../../src/components/atoms";

interface WarningParams {
  firstText: string;
  secondText: string;
}

export const Warning = ({ firstText, secondText }: WarningParams) => {
  return (
    <View className="px-[16px] py-[12px] border-[1px] border-[#eee] bg-[#f8f8f8] mx-[28px] rounded-[8px] flex flex-row">
      <Text font="bold" cn="text-[#333]">
        {firstText}
      </Text>

      <View className="w-[4px]" />

      <Text font="semiBold" cn="text-[#555]">
        {secondText}
      </Text>
    </View>
  );
};
