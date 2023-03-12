import { View } from "react-native";
import { useTranslationsContext } from "../src/hooks";
import { Text } from "../src/components/atoms";

const App = () => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <Text cn={"text-[36px] text-[#444]"} font="extraBold">
        home page baby
      </Text>
    </View>
  );
};

export default App;
