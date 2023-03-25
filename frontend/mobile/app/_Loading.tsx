import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <>
      <ActivityIndicator
        className="grow"
        animating={true}
        color="#0E333C"
        size={28}
      />
    </>
  );
};

export default Loading;
