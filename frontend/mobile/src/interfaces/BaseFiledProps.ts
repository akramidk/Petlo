import { KeyboardType } from "react-native";

export interface BaseFiledProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  cn?: string;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
}
