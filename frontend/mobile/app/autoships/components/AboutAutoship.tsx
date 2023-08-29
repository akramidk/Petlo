import clsx from "clsx";
import { View, Text as ReactText } from "react-native";
import { Icon, Text } from "../../../src/components/atoms";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";

export const AboutAutoship = () => {
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const points: string[] = Object.keys(t("ABOUT_AUTOSHIP__POINTS")).map(
    (key) => t("ABOUT_AUTOSHIP__POINTS")[key]
  );

  return (
    <View className="space-y-[4px]">
      <View className="bg-[#E7E3D8] rounded-[4px] p-[32]">
        <View className="space-y-[20px]">
          <View className={"space-y-[8px]"}>
            <ReactText
              className={clsx(
                "font-chillax-bold text-[#0E333C] text-[20px] flex",
                direction === "ltr" ? "text-left" : "text-right"
              )}
            >
              Autoship
            </ReactText>

            <Text
              font="extraBold"
              cn={clsx(
                "text-[24px] text-[#363636] ",
                direction === "ltr" ? "leading-9" : "leading-[44px]"
              )}
            >
              {t("ABOUT_AUTOSHIP__TITLE")}
            </Text>
          </View>

          <View className="space-y-[12px]">
            {points.map((point, index) => {
              return (
                <View
                  key={index}
                  className={clsx(
                    "flex items-center",
                    direction === "ltr" ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  <Icon name="checkCircle" size={22} color="#4A956D" />
                  <Text
                    font="semiBold"
                    cn={clsx(
                      "text-[#555] text-[15px]",
                      direction === "ltr" ? "ml-[6px]" : "mr-[6px]"
                    )}
                  >
                    {point}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View className="bg-[#E7E3D8] rounded-[4px] p-[32]">
        <Text font="extraBold" cn="text-[#363636] text-[16px]">
          Common Questions
        </Text>
      </View>
    </View>
  );
};
