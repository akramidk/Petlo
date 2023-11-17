import { View } from "react-native";
import { ButtonProps, LinkProps } from "../../interfaces";
import { Button, BackButton, Text, Link, BottomContainer } from "../atoms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import clsx from "clsx";
import * as Device from "expo-device";
import { BaseButton } from "../bases";
import { useState } from "react";
import { PageStructureLayoutContext } from "../../contexts";

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
  scrollEnabled?: boolean;
  HelperComponent?: React.ReactNode;
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
  scrollEnabled = true,
  HelperComponent,
}: PageStructureProps) => {
  const isIOS = Device.brand.toLowerCase() === "apple";
  const linkProps = {
    ...link,
    cn: clsx("py-[14px] items-center justify-center", link?.cn),
  };

  const [layout, setLayout] = useState({ height: null });
  return (
    <PageStructureLayoutContext.Provider value={{ height: layout.height }}>
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
            {HelperComponent && <View>{HelperComponent}</View>}
          </View>
        )}

        <KeyboardAwareScrollView
          scrollEnabled={scrollEnabled}
          onLayout={(event) => {
            setLayout({
              height: event.nativeEvent.layout.height,
            });
          }}
        >
          <View className={clsx("px-[28px] pb-[28px]", viewCN)}>
            {children}
          </View>
        </KeyboardAwareScrollView>

        {floatingElement && (
          <View
            className={clsx(
              "absolute bottom-[16px] self-center",
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
    </PageStructureLayoutContext.Provider>
  );
};

export default PageStructure;
