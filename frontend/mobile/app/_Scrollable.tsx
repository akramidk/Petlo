import clsx from "clsx";
import { ScrollView } from "react-native-gesture-handler";

interface ScrollableProps {
  children: React.ReactNode;
  cn?: string;
}

const Scrollable = ({ children, cn }: ScrollableProps) => {
  return (
    <ScrollView className={clsx("grow p-[28px]", cn)}>{children}</ScrollView>
  );
};

export default Scrollable;
