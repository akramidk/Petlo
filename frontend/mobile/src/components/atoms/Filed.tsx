import { View, TextInput } from "react-native";
import Label from "./Label";
import { LabelProps } from "../../interfaces";
import clsx from "clsx";
import { useSettingsContext } from "../../hooks";

interface FiledProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: LabelProps;
  cn?: string;
}

const Filed = ({ value, onChange, placeholder, label, cn }: FiledProps) => {
  const { language, direction } = useSettingsContext();

  return (
    <View className={clsx("space-y-[6px]", cn)}>
      {label && <Label {...label} />}
      <TextInput
        className={clsx(
          "bg-[#F6F6F6] h-[60px] rounded-[4px] px-[20px] border-[1px] border-[#F6F6F6] focus:border-[#eee] text-[14px] text-[#444]",
          language === "en" ? "font-e500" : "font-a400",
          direction === "ltr" ? "text-left" : "text-right"
        )}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default Filed;
