import { useState } from "react";
import { View, Pressable, Modal, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { OptionsSelector } from "../molecules";
import Filed from "./Filed";
import Text from "./Text";
import { OptionBase, OptionsSelectorProps } from "../../interfaces";

interface SelectorProps<T> {
  placeholder?: string;
  config: OptionsSelectorProps<T>;
}

const Selector = <T extends OptionBase>({
  placeholder,
  config,
}: SelectorProps<T>) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  if (isOptionsOpen) {
    return (
      <Modal>
        <SafeAreaView>
          <View className="flex-row border-b-[1px] border-b-[#f6f6f6] h-[56px] px-[28px] justify-between items-center">
            <TextInput
              placeholder="type anything to search"
              placeholderTextColor="#aaa"
              className="h-full flex-1"
            />
            <Pressable
              onPress={() => setIsOptionsOpen(false)}
              className="h-full justify-center"
            >
              <Text
                className="text-[#E64848] text-[14px] tracking-[1px]"
                font={["font-e800", "font-a700"]}
              >
                CANCEL
              </Text>
            </Pressable>
          </View>

          <OptionsSelector<T> cn="py-[28px]" optionCN="px-[28px]" {...config} />
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <View className="flex-row  bg-[#F6F6F6] h-[60px] rounded-[4px] px-[20px] justify-between items-center">
      {
        //<Text className="text-[14px] text-[#aaa]">placeholder</Text>
      }

      <Pressable onPress={() => setIsOptionsOpen(true)}>
        <Text
          className="text-[#E64848] text-[14px] tracking-[1px]"
          font={["font-e800", "font-a700"]}
        >
          select
        </Text>
      </Pressable>
    </View>
  );
};

export default Selector;
