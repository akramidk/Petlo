import { useState } from "react";
import { View, Pressable, Modal, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { OptionsSelector } from "../molecules";
import Text from "./Text";
import { OptionBase } from "../../interfaces";
import Button from "./Button";

//need refactoring
interface SelectorProps<T> {
  placeholder?: string;
  options: T[];
  value: T | undefined;
  setValue: (value: T) => void;
}

const Selector = <T extends OptionBase>({
  placeholder,
  options,
  value,
  setValue,
}: SelectorProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<T>(value);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const onCancel = () => {
    if (selectedOption && !value) setSelectedOption(undefined);
    setIsOptionsOpen(false);
  };

  const onSelect = () => {
    if (selectedOption && value !== selectedOption) setValue(selectedOption);
    setIsOptionsOpen(false);
  };

  if (isOptionsOpen) {
    return (
      <Modal>
        <SafeAreaView>
          <View className="h-full justify-between">
            <View>
              <View className="flex-row border-b-[1px] border-b-[#f6f6f6] h-[56px] px-[28px] justify-between items-center">
                <TextInput
                  placeholder="type anything to search"
                  placeholderTextColor="#aaa"
                  className="h-full flex-1"
                />
                <Pressable onPress={onCancel} className="h-full justify-center">
                  <Text
                    className="text-[#E64848] text-[14px] tracking-[1px]"
                    font={["font-e800", "font-a700"]}
                  >
                    CANCEL
                  </Text>
                </Pressable>
              </View>

              <OptionsSelector<T>
                cn="py-[28px]"
                optionCN="px-[28px]"
                options={options}
                signalSelect={{
                  selectedOption: selectedOption,
                  setSelectedOption: setSelectedOption,
                }}
              />
            </View>

            <View className="border-t-[1px] border-[#f6f6f6]">
              <View className="py-[16px] px-[28px]">
                <Button
                  status={selectedOption ? "active" : "inactive"}
                  value="Select"
                  onClick={onSelect}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <View className="flex-row  bg-[#F6F6F6] h-[60px] rounded-[4px] px-[20px] justify-between items-center">
      <Text
        className="text-[#E64848] text-[14px] tracking-[1px]"
        font={["font-e800", "font-a700"]}
      >
        {value?.value ?? placeholder}
      </Text>

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
