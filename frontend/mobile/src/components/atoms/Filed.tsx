import { View } from "react-native";
import { BaseLabel } from "../bases";
import { BaseLabelProps } from "../../interfaces";
import clsx from "clsx";
import { BaseFiled } from "../bases";
import { KeyboardType } from "react-native";

interface FiledProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: BaseLabelProps;
  cn?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
}

const Filed = ({
  value,
  onChange,
  placeholder,
  label,
  cn,
  secureTextEntry,
  keyboardType,
}: FiledProps) => {
  return (
    <View className={clsx(cn)}>
      {label && <BaseLabel cn="mb-[6px]" {...label} />}
      <BaseFiled
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Filed;
