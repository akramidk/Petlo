import { useState } from "react";
import { View } from "react-native";
import { BaseOption, BaseSelectorProps, OptionsProps } from "../../interfaces";
import { BaseLabelProps } from "../../interfaces";
import BaseLabel from "../bases/BaseLabel";
import BaseSelector from "../bases/BaseSelector";
import SelectorModal from "../bases/SelectorModal";
interface SelectorProps<T> {
  cn?: string;
}

const Selector = <T extends BaseOption>({
  placeholder,
  options,
  signalSelect,
  translate = false,
  cn,
  name,
  helperText,
  require,
  showDropdownIcon,
}: SelectorProps<T> &
  Pick<BaseLabelProps, "name" | "helperText" | "require"> &
  Pick<OptionsProps<T>, "options" | "signalSelect" | "translate"> &
  Pick<BaseSelectorProps<T>, "placeholder" | "showDropdownIcon">) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

  return (
    <>
      <SelectorModal
        visible={optionsModalVisible}
        setVisibility={setOptionsModalVisible}
        options={options}
        signalSelect={signalSelect}
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
          value={signalSelect.selectedOption?.value}
          onClick={setOptionsModalVisible}
          translate={translate}
          showDropdownIcon={showDropdownIcon}
        />
      </View>
    </>
  );
};

export default Selector;
