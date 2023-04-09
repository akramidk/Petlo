import clsx from "clsx";
import { View } from "react-native";

interface BottomContainerProps {
  children: React.ReactNode;
  cn?: string;
}

const BottomContainer = ({ children, cn }: BottomContainerProps) => {
  return (
    <View
      className={clsx(
        "fixed border-t-[1px] border-[#f6f6f6] px-[28px] pt-[16px]",
        cn
      )}
    >
      {children}
    </View>
  );
};

export default BottomContainer;
