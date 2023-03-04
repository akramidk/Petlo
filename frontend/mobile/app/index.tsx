import { View, Text, Button } from "react-native";
import clsx from "clsx";
import { useSettings, useTranslationsContext } from "../src/hooks";

const App = () => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <Text className={clsx("text-[36px] text-[#db3d3d]")}>
        {t("SELECT_LANGUAGE_TITLE")}
      </Text>
    </View>
  );
};

export default App;
