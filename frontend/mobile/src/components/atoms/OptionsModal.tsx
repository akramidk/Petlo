import clsx from "clsx";
import { useState, useMemo } from "react";
import {
  View,
  Modal,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useSettingsContext, useTranslationsContext } from "../../hooks";
import { OptionBase } from "../../interfaces";
import Text from "./Text";
import Button from "./Button";
import { OptionsSelector } from "../molecules";

interface OptionsModal<T> {
  visible?: boolean;
  setVisibility?: (visible: boolean) => void;
  options: T[];
  value: T | undefined;
  setValue: (value: T) => void;
  translate?: boolean;
}

const OptionsModal = <T extends OptionBase>({
  visible,
  setVisibility,
  options,
  value,
  setValue,
  translate = false,
}: OptionsModal<T>) => {
  const { t } = useTranslationsContext();
  const { language, direction } = useSettingsContext();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<T>(value);

  const onCancel = () => {
    if (selectedOption && value !== selectedOption) setSelectedOption(value);
    setSearchValue("");
    setVisibility(false);
  };

  const onSelect = () => {
    if (selectedOption && value !== selectedOption) setValue(selectedOption);
    setSearchValue("");
    setVisibility(false);
  };

  const optionsAfterSearch = useMemo(() => {
    return options.filter((option) => option.value.includes(searchValue));
  }, [searchValue]);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView className="h-full flex flex-col">
        <View
          className={clsx(
            "border-b-[1px] border-b-[#f6f6f6] h-[56px] px-[28px] justify-between items-center",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <TextInput
            placeholder={t("OPTIONS_MODAL_COMP_SEARCH")}
            placeholderTextColor="#aaa"
            className={clsx(
              "h-full flex-1",
              direction === "ltr" ? "text-left" : "text-right",
              language === "en" ? "font-e500" : "font-a400"
            )}
            onChangeText={setSearchValue}
          />
          <Pressable onPress={onCancel} className="h-full justify-center">
            <Text
              className={clsx(
                "text-[#E64848] text-[14px]",
                language === "en" && "tracking-[1px]"
              )}
              font={["font-e700", "font-a600"]}
            >
              {t("OPTIONS_MODAL_COMP_CANCEL")}
            </Text>
          </Pressable>
        </View>

        <ScrollView className="grow">
          <OptionsSelector<T>
            cn="py-[28px]"
            optionCN="px-[28px]"
            options={optionsAfterSearch}
            signalSelect={{
              selectedOption: selectedOption,
              setSelectedOption: setSelectedOption,
            }}
            translate={translate}
          />
        </ScrollView>

        <View className="fixed border-t-[1px] border-[#f6f6f6] py-[16px] px-[28px]">
          <Button
            status={
              selectedOption && selectedOption.value !== value?.value
                ? "active"
                : "inactive"
            }
            value={t("OPTIONS_MODAL_COMP_SELECT")}
            onClick={onSelect}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default OptionsModal;
