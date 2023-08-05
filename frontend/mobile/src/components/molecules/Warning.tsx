import { View } from "react-native";
import { Text } from "../atoms";
import { BaseButton } from "../bases";

interface WarningParams {
  firstText?: string;
  secondText: string;
  onClick?: () => void;
}
const Warning = ({ firstText, secondText, onClick }: WarningParams) => {
  return (
    <Container
      cn="px-[16px] py-[12px] border-[1px] border-[#eee] bg-[#f8f8f8] rounded-[8px]"
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

export default Warning;

const Container = ({ children, cn, onClick }) =>
  onClick ? (
    <BaseButton cn={cn} onClick={onClick}>
      {children}
    </BaseButton>
  ) : (
    <View className={cn}>{children}</View>
  );
