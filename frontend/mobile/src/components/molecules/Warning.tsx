import clsx from "clsx";
import { View } from "react-native";
import { Text } from "../atoms";
import { BaseButton } from "../bases";

interface WarningParams {
  firstText?: string;
  secondText: string;
  onClick?: () => void;
  containerCN?: string;
  viewCN?: string;
}
const Warning = ({
  firstText,
  secondText,
  onClick,
  containerCN,
  viewCN,
}: WarningParams) => {
  return (
    <Container
      cn={clsx(
        "px-[16px] py-[12px] border-[1px] border-[#eee] bg-[#f8f8f8] rounded-[8px]",
        containerCN
      )}
      onClick={onClick}
    >
      <View className={clsx("space-y-[4px]", viewCN)}>
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
