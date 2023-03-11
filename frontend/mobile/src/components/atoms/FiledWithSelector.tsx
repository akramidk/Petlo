import { useState } from "react";
import { View } from "react-native";
import { OptionBase } from "../../interfaces";
import BaseFiled from "./BaseFiled";
import BaseSelector from "./BaseSelector";
import OptionsModal from "./OptionsModal";
import { LabelProps } from "../../interfaces";
import Label from "./Label";
import clsx from "clsx";

interface FiledWithSelectorProps<T> {
  options: T[];
  optionValue: T | undefined;
  setOptionValue: (value: T) => void;
  filedValue: string;
  onChangeFiledValue: (value: string) => void;
  label?: LabelProps;
  translate?: boolean;
  cn?: string;
  placeholder?: string;
}

const FiledWithSelector = <T extends OptionBase>({
  options,
  optionValue,
  setOptionValue,
  filedValue,
  onChangeFiledValue,
  translate = false,
  label,
  cn,
  placeholder,
}: FiledWithSelectorProps<T>) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <View className={clsx("space-y-[6px]", cn)}>
      {label && <Label {...label} />}
      <View className="flex-row">
        <OptionsModal
          visible={optionsModalVisible}
          setVisibility={setOptionsModalVisible}
          options={options}
          value={optionValue}
          setValue={setOptionValue}
          translate={translate}
        />
        <BaseSelector
          cn="rounded-r-[0px] mr-[1px]"
          value={optionValue}
          setOptionsModalVisible={setOptionsModalVisible}
          translate={translate}
          showDropdownIcon
          preventRTL
        />
        <BaseFiled
          cn="flex-1 rounded-l-[0px]"
          onChange={onChangeFiledValue}
          value={filedValue}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export default FiledWithSelector;
