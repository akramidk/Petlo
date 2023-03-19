import { SafeAreaView } from "react-native-safe-area-context";

interface ViewerProps {
  children: React.ReactNode;
}

const Viewer = ({ children }: ViewerProps) => {
  return (
    <SafeAreaView className="px-[28px] py-[12px]">{children}</SafeAreaView>
  );
};

export default Viewer;
