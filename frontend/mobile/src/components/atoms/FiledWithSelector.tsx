import { useState } from "react";
import { View } from "react-native";
import { OptionBase } from "../../interfaces";
import BaseSelector from "./BaseSelector";
import Filed from "./Filed";
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
        value={value}
        setOptionsModalVisible={setOptionsModalVisible}
        translate={translate}
      />
      <Filed cn="flex-1" onChange={() => {}} />
    </View>
  );
};

export default FiledWithSelector;
