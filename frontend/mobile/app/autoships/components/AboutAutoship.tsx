import { View, Text as ReactText } from "react-native";
import { Icon, Text } from "../../../src/components/atoms";

export const AboutAutoship = () => {
  return (
    <View>
      <View className="bg-[#E7E3D8] rounded-[4px] p-[32]">
        <View className="space-y-[32px]">
          <View className="space-y-[12px]">
            <ReactText className="font-chillax-bold text-[#222] text-[20px]">
              Autoship
            </ReactText>

            <View className="space-y-[6px]">
              <Text font="extraBold" cn="text-[24px] text-[#333] leading-9">
                Schedule Your Pets’{"\n"}Needs.
              </Text>

              <Text font="semiBold" cn="text-[16px] text-[#555]">
                No More Going To Stores.
              </Text>
            </View>
          </View>

          <View>
            <View className="flex flex-row items-center space-x-[6px]">
              <Icon name="checkCircle" size={22} color="#4A956D" />
              <Text font="semiBold" cn="text-[#555] text-[14px]">
                5% off on Autoship items amount
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
