import { View } from "react-native";
import { ButtonProps } from "../../interfaces";
import { Button, BackButton, Text } from "../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface PageStructureProps {
  title?: string;
  helperText?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
  backButton?: () => void;
}

const PageStructure = ({
  title,
  helperText,
  children,
  button,
  backButton,
}: PageStructureProps) => {
  return (
    <>
      <View className="p-[28px] space-y-[12px]">
        {backButton && <BackButton onClick={backButton} />}
        {title && (
          <Text cn="text-[28px] text-[#0E333C]" font="extraBold">
            {title}
          </Text>
        )}
        {helperText && (
          <Text cn="text-[16px] text-[#888] leading-[28px]" font="medium">
            {helperText}
          </Text>
        )}
      </View>

      <KeyboardAwareScrollView>
        <View className="px-[28px] pb-[28px]">{children}</View>
      </KeyboardAwareScrollView>

      {button && <Button {...button} />}
    </>
  );
};

export default PageStructure;
