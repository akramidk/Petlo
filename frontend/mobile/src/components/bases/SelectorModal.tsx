import clsx from "clsx";
import { useState, useMemo } from "react";
import { View, Modal, SafeAreaView, TextInput, ScrollView } from "react-native";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import { BaseOption, OptionsProps } from "../../interfaces";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Options from "../atoms/Options";
import BaseButton from "./BaseButton";

interface SelectorModalProps<T> {
  visible?: boolean;
  setVisibility?: (visible: boolean) => void;
}

const SelectorModal = <T extends BaseOption>({
  visible,
  setVisibility,
  options,
  signalSelect,
  translate = false,
}: SelectorModalProps<T> &
  Pick<OptionsProps<T>, "options" | "translate" | "signalSelect">) => {
  const { t } = useTranslationsContext();
  const { language, direction } = useInternationalizationContext();
  const pastSelectedOption = useMemo(() => {
    return signalSelect.selectedOption;
  }, [signalSelect.selectedOption]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<T>(pastSelectedOption);

  const onCancel = () => {
    if (pastSelectedOption?.id !== selectedOption?.id) {
      setSelectedOption(pastSelectedOption);
    }
    setSearchValue("");
    setVisibility(false);
  };

  const onSelect = () => {
    if (pastSelectedOption?.id !== selectedOption?.id) {
      signalSelect.setSelectedOption(selectedOption);
    }
    setSearchValue("");
    setVisibility(false);
  };

  const optionsAfterSearch = useMemo(() => {
    return options.filter((option) => option.value.includes(searchValue));
  }, [searchValue, options]);

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
            placeholder={t("OPTIONS_MODAL_COMP__SEARCH")}
            placeholderTextColor="#aaa"
            className={clsx(
              "h-full flex-1",
              direction === "ltr" ? "text-left" : "text-right",
              language === "en" ? "font-e500" : "font-a400"
            )}
            onChangeText={setSearchValue}
          />
          <BaseButton onClick={onCancel} cn="h-full justify-center-center">
            <Text
              cn={"text-[#E64848] text-[14px] self-center"}
              font="bold"
              specificCN={{
                languages: {
                  en: "tracking-[1px]",
                  ar: "",
                },
              }}
            >
              {t("OPTIONS_MODAL_COMP__CANCEL")}
            </Text>
          </BaseButton>
        </View>

        <ScrollView className="grow">
          <Options<T>
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

        <View
          className={clsx(
            "fixed border-t-[1px] border-[#f6f6f6] px-[28px] pt-[16px]"
          )}
        >
          <Button
            status={
              selectedOption?.id !== pastSelectedOption?.id
                ? "active"
                : "inactive"
            }
            value={t("OPTIONS_MODAL_COMP__SELECT")}
            onClick={onSelect}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SelectorModal;
