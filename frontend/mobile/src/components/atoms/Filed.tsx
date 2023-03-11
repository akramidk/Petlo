import { View } from "react-native";
import Label from "./Label";
import { LabelProps } from "../../interfaces";
import clsx from "clsx";
import BaseFiled from "./BaseFiled";

interface FiledProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: LabelProps;
  cn?: string;
  secureTextEntry?: boolean;
}

const Filed = ({
  value,
  onChange,
  placeholder,
  label,
  cn,
  secureTextEntry,
}: FiledProps) => {
  return (
    <View className={clsx(cn)}>
      {label && <Label cn="mb-[6px]" {...label} />}
      <BaseFiled
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Filed;
