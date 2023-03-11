import { View } from "react-native";
import { ButtonProps } from "../../interfaces";
import { Button, BackButton, Text } from "../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface FormProps {
  title?: string;
  helperText?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
  backButton?: () => void;
}

const Form = ({
  title,
  helperText,
  children,
  button,
  backButton,
}: FormProps) => {
  return (
    <View className="h-full justify-between">
      <View className="space-y-[12px] mb-[28px]">
        {backButton && <BackButton onClick={backButton} />}
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
            cn="text-[16px] text-[#888] leading-[28px]"
            font={["font-e500", "font-a400"]}
          >
            {helperText}
          </Text>
        )}
      </View>

      <KeyboardAwareScrollView className="mb-[28px]">
        {children}
      </KeyboardAwareScrollView>

      {button && <Button {...button} />}
    </View>
  );
};

export default Form;
