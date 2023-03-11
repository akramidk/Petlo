import { View } from "react-native";
import clsx from "clsx";
import { useTranslationsContext } from "../src/hooks";
import { Text } from "../src/components/atoms";

const App = () => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <Text
        cn={clsx("text-[36px] text-[#444]")}
        font={["font-e800", "font-a700"]}
      >
        home page baby
      </Text>
    </View>
  );
};

export default App;
