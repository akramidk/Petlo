import clsx from "clsx";
import { useEffect, useState } from "react";
import { View, Text as ReactText } from "react-native";
import { Icon, Text } from "../../../src/components/atoms";
import { BaseButton } from "../../../src/components/bases";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import * as Clipboard from "expo-clipboard";

const PHONE_NUMBER = "+962790119952";

export const AboutAutoship = () => {
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const points: string[] = Object.keys(t("ABOUT_AUTOSHIP__POINTS")).map(
    (key) => t("ABOUT_AUTOSHIP__POINTS")[key]
  );

  const [openedQuestionIndex, setOpenedQuestionIndex] = useState<number>();

  const [clipboardClicked, setClipboardClicked] = useState(false);

  useEffect(() => {
    if (clipboardClicked === false) return;
    const timeout = setTimeout(() => setClipboardClicked(false), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [clipboardClicked]);

  return (
    <View className="space-y-[4px]">
      <BaseButton
        onClick={async () => {
          setClipboardClicked(true);
          await Clipboard.setStringAsync(PHONE_NUMBER);
        }}
        cn={clsx(
          "flex bg-[#f6f6f6] h-[44px] justify-center items-center rounded-[4px]",
          direction === "ltr" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <Text font="semiBold" cn="text-[14px] text-[#666]">
          {t("ABOUT_AUTOSHIP__COMMON_QUESTIONS_SUPPORT")}{" "}
        </Text>

        {clipboardClicked ? (
          <Icon
            name="checkMark"
            solid={false}
            size={16}
            color="#4A956D"
            strokeWidth={3.4}
          />
        ) : (
          <Icon
            name="clipboard"
            strokeWidth={2.2}
            solid={false}
            size={16}
            color="#666"
          />
        )}
      </BaseButton>

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
        <Text font="extraBold" cn="text-[#363636] text-[18px] mb-[4px]">
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
