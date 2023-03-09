import { useState } from "react";
import { View } from "react-native";
import { OptionBase } from "../../interfaces";
import BaseFiled from "./BaseFiled";
import BaseSelector from "./BaseSelector";
import OptionsModal from "./OptionsModal";

interface FiledWithSelectorProps<T> {
  options: T[];
  value: T | undefined;
  setValue: (value: T) => void;
  translate?: boolean;
}

const FiledWithSelector = <T extends OptionBase>({
  options,
  value,
  setValue,
  translate = false,
}: FiledWithSelectorProps<T>) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <View className="flex-row">
      <OptionsModal
        visible={optionsModalVisible}
        setVisibility={setOptionsModalVisible}
        options={options}
        value={value}
        setValue={setValue}
        translate={translate}
      />
      <BaseSelector
        cn="rounded-r-[0px] mr-[1px]"
        value={value}
        setOptionsModalVisible={setOptionsModalVisible}
        translate={translate}
        showDropdownIcon
      />
      <BaseFiled cn="flex-1 rounded-l-[0px]" onChange={() => {}} />
    </View>
  );
};

export default FiledWithSelector;
