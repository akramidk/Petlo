import { View } from "react-native";
import { ButtonProps, LinkProps } from "../../interfaces";
import { Button, BackButton, Text, Link } from "../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import clsx from "clsx";

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
          <Text cn="text-[16px] text-[#888] leading-[28px]" font="medium">
            {helperText}
          </Text>
        )}
      </View>

      <KeyboardAwareScrollView>
        <View className="px-[28px] pb-[28px]">{children}</View>
      </KeyboardAwareScrollView>

      {(button || link) && (
        <View className="fixed border-t-[1px] border-[#f6f6f6] pt-[16px] px-[28px]">
          {button && <Button {...button} />}
          {link && <Link {...linkProps} />}
        </View>
      )}
    </>
  );
};

export default PageStructure;
