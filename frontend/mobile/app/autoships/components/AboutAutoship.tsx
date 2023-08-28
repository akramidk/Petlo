import { View, Text as ReactText } from "react-native";
import { Icon, Text } from "../../../src/components/atoms";
import { useTranslationsContext } from "../../../src/hooks";

export const AboutAutoship = () => {
  const { t } = useTranslationsContext();

  const points: string[] = Object.keys(t("ABOUT_AUTOSHIP__POINTS")).map(
    (key) => t("ABOUT_AUTOSHIP__POINTS")[key]
  );

  return (
    <View>
      <View className="bg-[#E7E3D8] rounded-[4px] p-[32]">
        <View className="space-y-[32px]">
          <View className="space-y-[8px]">
            <ReactText className="font-chillax-bold text-[#0E333C] text-[20px]">
              Autoship
            </ReactText>

            <View className="space-y-[6px]">
              <Text font="extraBold" cn="text-[24px] text-[#363636] leading-9">
                {t("ABOUT_AUTOSHIP__TITLE")}
              </Text>

              <Text font="semiBold" cn="text-[16px] text-[#555]">
                No More Going To Stores.
              </Text>
            </View>
          </View>

          <View className="space-y-[12px]">
            {points.map((point, index) => {
              return (
                <View
                  key={index}
                  className="flex flex-row items-center space-x-[6px]"
                >
                  <Icon name="checkCircle" size={22} color="#4A956D" />
                  <Text font="semiBold" cn="text-[#555] text-[15px]">
                    {point}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
