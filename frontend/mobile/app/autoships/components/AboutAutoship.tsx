import clsx from "clsx";
import { useState } from "react";
import { View, Text as ReactText } from "react-native";
import { Icon, Text } from "../../../src/components/atoms";
import { BaseButton } from "../../../src/components/bases";
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

  const [openedQuestionIndex, setOpenedQuestionIndex] = useState<number>();

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
        <Text font="extraBold" cn="text-[#363636] text-[16px] mb-[8px]">
          {t("ABOUT_AUTOSHIP__COMMON_QUESTIONS_TITLE")}
        </Text>

        <View>
          {t("ABOUT_AUTOSHIP__COMMON_QUESTIONS").map((item, index) => {
            return (
              <View
                key={index}
                className="py-[20px] border-b border-b-[#cfcbbf] space-y-[16px]"
              >
                <BaseButton
                  cn={clsx(
                    "flex  justify-between items-center",
                    direction === "ltr" ? "flex-row" : "flex-row-reverse"
                  )}
                  onClick={() => {
                    if (index === openedQuestionIndex) {
                      setOpenedQuestionIndex(undefined);
                    } else {
                      setOpenedQuestionIndex(index);
                    }
                  }}
                >
                  <Text
                    font="bold"
                    cn="text-[#444] text-[14px] w-[80%] leading-[24px]"
                  >
                    {item.question}
                  </Text>
                  <Icon
                    solid={false}
                    name={
                      openedQuestionIndex === index
                        ? "chevronUp"
                        : "chevronDown"
                    }
                    color="#444"
                    strokeWidth={2.8}
                  />
                </BaseButton>

                {openedQuestionIndex === index && (
                  <Text
                    font="medium"
                    cn="text-[14px] text-[#666] leading-[24px]"
                  >
                    {item.answer}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
