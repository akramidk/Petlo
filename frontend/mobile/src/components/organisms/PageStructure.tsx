import { View } from "react-native";
import { ButtonProps, LinkProps } from "../../interfaces";
import { Button, BackButton, Text, Link, BottomContainer } from "../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import clsx from "clsx";
import * as Device from "expo-device";

interface PageStructureProps {
  title?: string;
  helperText?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
  backButton?: () => void;
  link?: LinkProps;
}

const PageStructure = ({
  title,
  helperText,
  children,
  button,
  backButton,
  link,
}: PageStructureProps) => {
  const isIOS = Device.brand.toLowerCase() === "apple";
  const linkProps = {
    ...link,
    cn: clsx("py-[14px] items-center justify-center", link?.cn),
  };

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
          <Text cn="text-[15.5px] text-[#888] leading-[28px]" font="medium">
            {helperText}
          </Text>
        )}
      </View>

      <KeyboardAwareScrollView>
        <View className="px-[28px] pb-[28px]">{children}</View>
      </KeyboardAwareScrollView>

      {(button || link) && (
        <BottomContainer cn={!isIOS && !link && "pb-[8px]"}>
          {button && <Button {...button} />}
          {link && <Link {...linkProps} />}
        </BottomContainer>
      )}
    </>
  );
};

export default PageStructure;
