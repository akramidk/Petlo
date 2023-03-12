import { useState } from "react";
import { View } from "react-native";
import { BaseOption } from "../../interfaces";
import { LabelProps } from "../../interfaces";
import Label from "./Label";
import { BaseSelector } from "../bases";
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

const Selector = <T extends BaseOption>({
  placeholder,
  label,
  options,
  value,
  setValue,
  translate = false,
  cn,
}: SelectorProps<T>) => {
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
