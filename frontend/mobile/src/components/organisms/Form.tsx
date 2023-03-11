import { View } from "react-native";
import { ButtonProps } from "../../interfaces";
import { Button } from "../atoms";
import { Text } from "../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

interface FormProps {
  title?: string;
  helperText?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
}

const Form = ({ title, helperText, children, button }: FormProps) => {
  return (
    <View className="h-full justify-between">
      <View className="space-y-[12px] mb-[28px]">
        {title && (
          <Text
            cn="text-[32px] text-[#0E333C]"
            font={["font-e800", "font-a700"]}
          >
            {title}
          </Text>
        )}
        {helperText && (
          <Text
            cn="text-[17px] text-[#888] leading-[28px]"
            font={["font-e500", "font-a400"]}
          >
            {helperText}
          </Text>
        )}
      </View>

      <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>

      {button && <Button {...button} />}
    </View>
  );
};

export default Form;
