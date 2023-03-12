import { PressableProps } from "react-native";

export interface BaseButtonProps extends Omit<PressableProps, "onPress"> {
  onClick: () => void;
  cn?: string;
  preventRTL?: boolean;
}
