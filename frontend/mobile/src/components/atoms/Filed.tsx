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
  cn?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
}

const Filed = ({
  value,
  onChange,
  placeholder,
  cn,
  secureTextEntry,
  keyboardType,
  name,
  helperText,
  require,
}: FiledProps & Pick<BaseLabelProps, "name" | "helperText" | "require">) => {
  return (
    <View className={clsx(cn)}>
      {name && (
        <BaseLabel
          cn="mb-[6px]"
          name={name}
          helperText={helperText}
          require={require}
        />
      )}
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
