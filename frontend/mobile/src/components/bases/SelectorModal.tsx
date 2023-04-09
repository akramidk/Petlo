import clsx from "clsx";
import { useState, useMemo } from "react";
import { View, Modal, SafeAreaView, TextInput, ScrollView } from "react-native";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import { BaseOption, OptionsProps } from "../../interfaces";
import { BottomContainer } from "../atoms";
import Button from "../atoms/Button";
import Options from "../atoms/Options";
import SearchFiled from "../atoms/SearchFiled";

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
        <SearchFiled
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          onCancel={onCancel}
        />

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

        <BottomContainer>
          <Button
            status={
              selectedOption?.id !== pastSelectedOption?.id
                ? "active"
                : "inactive"
            }
            value={t("OPTIONS_MODAL_COMP__SELECT")}
            onClick={onSelect}
          />
        </BottomContainer>
      </SafeAreaView>
    </Modal>
  );
};

export default SelectorModal;
