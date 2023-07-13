import { TextInput } from "react-native";
import clsx from "clsx";
import { useInternationalizationContext } from "../../hooks";
import { BaseFiledProps } from "../../interfaces";
import { useCallback } from "react";
//
const NUMBERS = {
  // ar
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",

  //en
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
};

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

  const onChangeHandler = useCallback(
    (text: string) => {
      if (keyboardType !== "number-pad") {
        onChange(text);
        return;
      }

      onChange(
        text
          .split("")
          .map((number) => NUMBERS[number])
          .join("")
      );
    },
    [onChange, keyboardType]
  );

  return (
    <TextInput
      className={clsx(
        "bg-[#F6F6F6] h-[60px] rounded-[4px] px-[20px] border-[1px] border-[#F6F6F6] focus:border-[#eee] text-[14px] text-[#444]",
        languageWithoutGender === "en" ? "font-e500" : "font-a400",
        direction === "ltr" ? "text-left" : "text-right",
        cn
      )}
      value={value}
      onChangeText={onChangeHandler}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
    />
  );
};

export default BaseFiled;
