import { ScrollView } from "react-native-gesture-handler";
import Viewable from "./_Viewable";

interface ScrollableProps {
  children: React.ReactNode;
  cn?: string;
}

const Scrollable = ({ children, cn }: ScrollableProps) => {
  return (
    <ScrollView className="grow">
      <Viewable cn={cn}>{children}</Viewable>
    </ScrollView>
  );
};

export default Scrollable;
