import { View } from "react-native";
import { Text } from "../../../src/components/atoms";

interface WarningParams {
  firstText: string;
  secondText: string;
}

export const Warning = ({ firstText, secondText }: WarningParams) => {
  return (
    <View className="px-[16px] py-[12px] border-[1px] border-[#eee] bg-[#f8f8f8] mx-[28px] rounded-[8px] space-y-[4px]">
      <Text font="bold" cn="text-[#333]">
        {firstText}
      </Text>

      <Text font="medium" cn="text-[#666]">
        {secondText}
      </Text>
    </View>
  );
};
