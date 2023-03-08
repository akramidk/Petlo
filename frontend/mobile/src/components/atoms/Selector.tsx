import { useMemo, useState } from "react";
import { View, Pressable, Modal, SafeAreaView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { OptionsSelector } from "../molecules";
import Text from "./Text";
import { OptionBase } from "../../interfaces";
import Button from "./Button";
import { useSettingsContext, useTranslationsContext } from "../../hooks";
import clsx from "clsx";
import { LabelProps } from "../../interfaces";
import Label from "./Label";

//todo: need refactoring
interface SelectorProps<T> {
  placeholder?: string;
  label?: LabelProps;
  options: T[];
  value: T | undefined;
  setValue: (value: T) => void;
}

const Selector = <T extends OptionBase>({
  placeholder,
  label,
  options,
  value,
  setValue,
}: SelectorProps<T>) => {
  const { t } = useTranslationsContext();
  const { language, direction } = useSettingsContext();

  const [searchValue, setSearchValue] = useState<string>("");
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

  const optionsAfterSearch = useMemo(() => {
    return options.filter((option) => option.value.includes(searchValue));
  }, [searchValue]);

  return (
    <View>
      <Modal visible={isOptionsOpen} animationType="slide">
        <SafeAreaView>
          <View className="h-full justify-between">
            <View>
              <View className="flex-row border-b-[1px] border-b-[#f6f6f6] h-[56px] px-[28px] justify-between items-center">
                <TextInput
                  placeholder={t("SELECTOR_COMP_SEARCH")}
                  placeholderTextColor="#aaa"
                  className="h-full flex-1"
                  onChangeText={setSearchValue}
                />
                <Pressable onPress={onCancel} className="h-full justify-center">
                  <Text
                    className="text-[#E64848] text-[14px] tracking-[1px]"
                    font={["font-e700", "font-a600"]}
                  >
                    {t("SELECTOR_COMP_CANCEL")}
                  </Text>
                </Pressable>
              </View>

              <OptionsSelector<T>
                cn="py-[28px]"
                optionCN="px-[28px]"
                options={optionsAfterSearch}
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

      <View className={clsx("space-y-[6px]")}>
        {label && <Label {...label} />}
        <View className="flex-row  bg-[#F6F6F6] h-[60px] rounded-[4px] justify-between items-center">
          <Text
            className={clsx(
              "p-[20px]",
              language === "en" ? "font-e500" : "font-a400",
              direction === "ltr" ? "text-left" : "text-right",
              placeholder ? "text-[#aaa]" : "text-[#444]"
            )}
            font={["font-e800", "font-a700"]}
          >
            {value?.value ?? placeholder}
          </Text>

          <Pressable
            className="h-full justify-center p-[20px]"
            onPress={() => setIsOptionsOpen(true)}
          >
            <Text
              className="text-[#0E333C] text-[14px] tracking-[1px]"
              font={["font-e700", "font-a600"]}
            >
              {t("SELECTOR_COMP_SELECT")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Selector;
