import { useState } from "react";
import { View } from "react-native";
import { BaseOption } from "../../interfaces";
import { BaseLabelProps } from "../../interfaces";
import { BaseSelector, SelectorModal, BaseLabel } from "../bases";

interface SelectorProps<T> {
  placeholder?: string;
  options: T[];
  value: T | undefined;
  setValue: (value: T) => void;
  translate?: boolean;
  cn?: string;
}

const Selector = <T extends BaseOption>({
  placeholder,
  options,
  value,
  setValue,
  translate = false,
  cn,
  name,
  helperText,
  require,
}: SelectorProps<T> &
  Pick<BaseLabelProps, "name" | "helperText" | "require">) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <>
      <SelectorModal
        visible={optionsModalVisible}
        setVisibility={setOptionsModalVisible}
        options={options}
        value={value}
        setValue={setValue}
        translate={translate}
      />

      <View className={cn}>
        {name && (
          <BaseLabel
            cn="mb-[6px]"
            name={name}
            helperText={helperText}
            require={require}
          />
        )}
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
