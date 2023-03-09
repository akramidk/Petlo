import { View } from "react-native";
import Filed from "./Filed";
import Selector from "./Selector";

// TODO Selector & Filed should have a base comp

const FiledWithSelector = () => {
  return (
    <View className="flex-row justify-between">
      <Selector
        options={[{ id: 0, value: "akram" }]}
        value={{ id: 0, value: "akram" }}
        setValue={() => {}}
      />
      <Filed cn="flex-1" onChange={() => {}} />
    </View>
  );
};

export default FiledWithSelector;
