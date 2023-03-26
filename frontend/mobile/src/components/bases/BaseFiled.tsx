import { TextInput } from "react-native";
import clsx from "clsx";
import { useInternationalizationContext } from "../../hooks";
import { BaseFiledProps } from "../../interfaces";

const BaseFiled = ({
  value,
  onChange,
  placeholder,
  cn,
  keyboardType,
  secureTextEntry,
  maxLength,
}: BaseFiledProps) => {
  const { languageWithoutGender, direction } = useInternationalizationContext();

  return (
    <TextInput
      className={clsx(
        "bg-[#F6F6F6] h-[60px] rounded-[4px] px-[20px] border-[1px] border-[#F6F6F6] focus:border-[#eee] text-[14px] text-[#444]",
        languageWithoutGender === "en" ? "font-e500" : "font-a400",
        direction === "ltr" ? "text-left" : "text-right",
        cn
      )}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
    />
  );
};

export default BaseFiled;
