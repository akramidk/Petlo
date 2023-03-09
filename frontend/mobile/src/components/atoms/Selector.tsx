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
import BaseSelector from "./BaseSelector";
import OptionsModal from "./OptionsModal";

interface SelectorProps<T> {
  placeholder?: string;
  label?: LabelProps;
  options: T[];
  value: T | undefined;
  setValue: (value: T) => void;
  translate?: boolean;
  cn?: string;
}

const Selector = <T extends OptionBase>({
  placeholder,
  label,
  options,
  value,
  setValue,
  translate = false,
  cn,
}: SelectorProps<T>) => {
  const { t } = useTranslationsContext();
  const { language, direction } = useSettingsContext();

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<T>(value);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <>
      <OptionsModal
        visible={optionsModalVisible}
        setVisibility={setOptionsModalVisible}
        options={options}
        value={value}
        setValue={setValue}
        translate={translate}
      />

      <View className={cn}>
        {label && <Label cn="mb-[6px]" {...label} />}
        <BaseSelector
          placeholder={placeholder}
          value={value}
          setOptionsModalVisible={setOptionsModalVisible}
          translate={translate}
        />
      </View>
    </>
  );
};

export default Selector;
