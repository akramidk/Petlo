import { useState } from "react";
import { View, KeyboardType } from "react-native";
import { BaseOption, OptionsSelectorProps } from "../../interfaces";
import { BaseFiled, BaseSelector } from "../bases";
import OptionsModal from "./OptionsModal";
import { BaseLabelProps } from "../../interfaces";
import { BaseLabel } from "../bases";
import clsx from "clsx";

interface FiledWithSelectorProps<T> {
  optionValue: T | undefined;
  setOptionValue: (value: T) => void;
  filedValue: string;
  onChangeFiledValue: (value: string) => void;
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
  cn,
  placeholder,
  keyboardType,
  name,
  helperText,
  require,
}: FiledWithSelectorProps<T> &
  Pick<BaseLabelProps, "name" | "helperText" | "require"> &
  Pick<OptionsSelectorProps<T>, "options" | "translate">) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <View className={clsx("space-y-[6px]", cn)}>
      {name && (
        <BaseLabel name={name} helperText={helperText} require={require} />
      )}
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
