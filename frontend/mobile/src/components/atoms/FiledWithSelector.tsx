import { useState } from "react";
import { View } from "react-native";
import { BaseFiledProps, BaseOption, OptionsProps } from "../../interfaces";
import { BaseLabelProps } from "../../interfaces";
import clsx from "clsx";
import BaseLabel from "../bases/BaseLabel";
import BaseFiled from "../bases/BaseFiled";
import BaseSelector from "../bases/BaseSelector";
import SelectorModal from "../bases/SelectorModal";

interface FiledWithSelectorProps {
  cn?: string;
}

const FiledWithSelector = <T extends BaseOption>({
  cn,
  options,
  signalSelect,
  translate = false,
  placeholder,
  keyboardType,
  name,
  helperText,
  require,
  value,
  onChange,
}: FiledWithSelectorProps &
  BaseFiledProps &
  Partial<BaseLabelProps> &
  Pick<OptionsProps<T>, "options" | "translate" | "signalSelect">) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <View className={clsx("space-y-[6px]", cn)}>
      {name && (
        <BaseLabel name={name} helperText={helperText} require={require} />
      )}
      <View className="flex-row">
        <SelectorModal
          visible={optionsModalVisible}
          setVisibility={setOptionsModalVisible}
          options={options}
          signalSelect={signalSelect}
          translate={translate}
        />
        <BaseSelector
          cn="rounded-r-[0px] mr-[1px]"
          value={signalSelect.selectedOption?.value}
          onClick={setOptionsModalVisible}
          translate={translate}
          showDropdownIcon
          preventRTL
        />
        <BaseFiled
          cn="flex-1 rounded-l-[0px]"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default FiledWithSelector;
