import { useState } from "react";
import { View, KeyboardType } from "react-native";
import { BaseOption } from "../../interfaces";
import { BaseFiled, BaseSelector } from "../bases";
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
  keyboardType?: KeyboardType;
}

const FiledWithSelector = <T extends BaseOption>({
  options,
  optionValue,
  setOptionValue,
  filedValue,
  onChangeFiledValue,
  translate = false,
  label,
  cn,
  placeholder,
  keyboardType,
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
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default FiledWithSelector;
