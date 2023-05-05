import { View } from "react-native";
import { BaseLabelProps, OptionsProps, BaseOption } from "../../interfaces";
import BaseLabel from "../bases/BaseLabel";
import Options from "./Options";

interface OptionsWithLabelProps<TOptions> {
  label: BaseLabelProps;
  options?: OptionsProps<TOptions>;
}

const OptionsWithLabel = <TOptions extends BaseOption>({
  label,
  options,
}: OptionsWithLabelProps<TOptions>) => {
  return (
    <View>
      <BaseLabel cn="mb-[16px]" {...label} />
      <Options {...options} />
    </View>
  );
};

export default OptionsWithLabel;
