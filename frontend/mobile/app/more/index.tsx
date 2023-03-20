import clsx from "clsx";
import { useRouter } from "expo-router";
import { Fragment } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon, Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
import { MORE_PAGE_SECTIONS } from "../../src/constants";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";

const More = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  return (
    <ScrollView className="space-y-[28px] py-[28px]">
      {MORE_PAGE_SECTIONS.map((section, i) => {
        return (
          <View key={i}>
            <Text font="extraBold" cn="text-[16px] text-[#0E333C] mb-[4px]">
              {t(section.title)}
            </Text>

            <View>
              {section.options.map((option, i) => {
                return (
                  <Fragment key={i}>
                    <BaseButton
                      onClick={() => router.push(option.path)}
                      cn="border-b-[1px] border-b-[#f6f6f6] py-[18px] items-center"
                    >
                      <Icon name={option.icon} size={18} color="#777" />
                      <Text
                        font="medium"
                        cn={clsx(
                          "text-[14px] text-[#777]",
                          direction === "ltr" ? "ml-[10px]" : "mr-[10px]"
                        )}
                      >
                        {t(option.name)}
                      </Text>
                    </BaseButton>
                  </Fragment>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default More;
