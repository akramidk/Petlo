import { View } from "react-native";
import { BaseFiledProps, BaseLabelProps } from "../../interfaces";
import clsx from "clsx";
import BaseLabel from "../bases/BaseLabel";
import BaseFiled from "../bases/BaseFiled";

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
}: BaseFiledProps &
  Pick<BaseLabelProps, "name" | "helperText" | "require">) => {
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
