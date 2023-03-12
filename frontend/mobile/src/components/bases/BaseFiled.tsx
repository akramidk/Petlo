import { TextInput, KeyboardType } from "react-native";
import clsx from "clsx";
import { useSettingsContext } from "../../hooks";

interface BaseFiledProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  cn?: string;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
}

const BaseFiled = ({
  value,
  onChange,
  placeholder,
  cn,
  keyboardType,
  secureTextEntry,
}: BaseFiledProps) => {
  const { language, direction } = useSettingsContext();

  return (
    <TextInput
      className={clsx(
        "bg-[#F6F6F6] h-[60px] rounded-[4px] px-[20px] border-[1px] border-[#F6F6F6] focus:border-[#eee] text-[14px] text-[#444]",
        language === "en" ? "font-e500" : "font-a400",
        direction === "ltr" ? "text-left" : "text-right",
        cn
      )}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default BaseFiled;
