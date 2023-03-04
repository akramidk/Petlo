import { View, Text } from "react-native";
import clsx from "clsx";
import { useTranslationsContext } from "../src/hooks";

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
