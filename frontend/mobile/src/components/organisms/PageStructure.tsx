import { View } from "react-native";
import { ButtonProps, LinkProps } from "../../interfaces";
import { Button, BackButton, Text, Link, BottomContainer } from "../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import clsx from "clsx";
import * as Device from "expo-device";
import { BaseButton } from "../bases";

interface PageStructureProps {
  title?: string;
  helperText?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
  backButton?: () => void;
  link?: LinkProps;
  floatingElement?: React.ReactNode;
  viewCN?: string;
  floatingElementCN?: string;
}

const PageStructure = ({
  title,
  helperText,
  children,
  button,
  backButton,
  link,
  floatingElement,
  viewCN,
  floatingElementCN,
}: PageStructureProps) => {
  const isIOS = Device.brand.toLowerCase() === "apple";
  const linkProps = {
    ...link,
    cn: clsx("py-[14px] items-center justify-center", link?.cn),
  };

  return (
    <View className="flex flex-1 relative bg-[#fff]">
      {(title || helperText || backButton) && (
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
      )}

      <KeyboardAwareScrollView>
        <View className={clsx("px-[28px] pb-[28px]", viewCN)}>{children}</View>
      </KeyboardAwareScrollView>

      {floatingElement && (
        <View
          className={clsx(
            "absolute bottom-[16px] self-center bg-[#fff]",
            floatingElementCN
          )}
        >
          {floatingElement}
        </View>
      )}

      {(button || link) && (
        <BottomContainer cn={!isIOS && !link && "pb-[8px]"}>
          {button && <Button {...button} />}
          {link && <Link {...linkProps} />}
        </BottomContainer>
      )}
    </View>
  );
};

export default PageStructure;
