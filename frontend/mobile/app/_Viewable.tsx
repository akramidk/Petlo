import clsx from "clsx";
import { View } from "react-native";

interface ViewableProps {
  children: React.ReactNode;
  cn?: string;
}

const Viewable = ({ children, cn }: ViewableProps) => {
  return <View className={clsx("p-[28px]", cn)}>{children}</View>;
};

export default Viewable;
