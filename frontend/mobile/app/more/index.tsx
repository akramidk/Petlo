import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon, Text } from "../../src/components/atoms";
import { BaseButton } from "../../src/components/bases";
import { MORE_PAGE_SECTIONS } from "../../src/constants";
import { useTranslationsContext } from "../../src/hooks";

const More = () => {
  const { t } = useTranslationsContext();

  return (
    <ScrollView className="space-y-[28px] py-[28px]">
      {MORE_PAGE_SECTIONS.map((section, i) => {
        return (
          <View key={i}>
            <Text font="extraBold" cn="text-[16px] text-[#0E333C] mb-[4px]">
              {t(section.title)}
            </Text>

            <View>
              {section.options.map((option, index) => {
                return (
                  <BaseButton
                    onClick={() => console.log(option.name)}
                    cn="border-b-[1px] border-b-[#f6f6f6] py-[18px] space-x-[10px] items-center"
                  >
                    <Icon name={option.icon} size={18} color="#777" />
                    <Text font="medium" cn="text-[14px] text-[#777]">
                      {t(option.name)}
                    </Text>
                  </BaseButton>
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
