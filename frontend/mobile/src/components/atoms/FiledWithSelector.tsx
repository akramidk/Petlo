import { useState } from "react";
import { View } from "react-native";
import {
  BaseFiledProps,
  BaseOption,
  OptionsSelectorProps,
} from "../../interfaces";
import { BaseFiled, BaseSelector } from "../bases";
import OptionsModal from "./OptionsModal";
import { BaseLabelProps } from "../../interfaces";
import { BaseLabel } from "../bases";
import clsx from "clsx";

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
  Pick<BaseLabelProps, "name" | "helperText" | "require"> &
  Pick<OptionsSelectorProps<T>, "options" | "translate" | "signalSelect">) => {
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
          value={signalSelect.selectedOption}
          setValue={signalSelect.setSelectedOption}
          translate={translate}
        />
        <BaseSelector
          cn="rounded-r-[0px] mr-[1px]"
          value={signalSelect.selectedOption}
          setOptionsModalVisible={setOptionsModalVisible}
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
