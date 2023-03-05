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
        {t("SELECT_LANGUAGE_TITLE")}
      </Text>
    </View>
  );
};

export default App;
