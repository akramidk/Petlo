import { View } from "react-native";
import { Text } from "../../../src/components/atoms";
import { BaseButton } from "../../../src/components/bases";

interface WarningParams {
  firstText?: string;
  secondText: string;
  onClick?: () => void;
}

export const Warning = ({ firstText, secondText, onClick }: WarningParams) => {
  return (
    <Container
      cn="px-[16px] py-[12px] border-[1px] border-[#eee] bg-[#f8f8f8] mx-[28px] rounded-[8px]"
      onClick={onClick}
    >
      <View className="space-y-[4px]">
        {firstText && (
          <Text font="bold" cn="text-[#333]">
            {firstText}
          </Text>
        )}

        <Text font="medium" cn="text-[#666]">
          {secondText}
        </Text>
      </View>
    </Container>
  );
};

const Container = ({ children, cn, onClick }) =>
  onClick ? (
    <BaseButton cn={cn} onClick={onClick}>
      {children}
    </BaseButton>
  ) : (
    <View className={cn}>{children}</View>
  );
