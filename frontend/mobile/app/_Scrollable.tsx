import clsx from "clsx";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface ScrollableProps {
  children: React.ReactNode;
  cn?: string;
}

const Scrollable = ({ children, cn }: ScrollableProps) => {
  return (
    <ScrollView className="grow">
      <View className={clsx("p-[28px]", cn)}>{children}</View>
    </ScrollView>
  );
};

export default Scrollable;
