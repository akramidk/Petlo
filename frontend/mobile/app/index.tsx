import { View, Text, Button } from "react-native";
import clsx from "clsx";
import { useContext } from "react";
import { SettingsContext, TranslationsContext } from "../src/contexts";

const App = () => {
  const t = useContext(TranslationsContext);
  const { setLanguage } = useContext(SettingsContext);

  return (
    <View>
      <Text className={clsx("text-[36px] text-[#db3d3d]")}>
        {t("APP_LANGUAGE_TITLE")}
      </Text>

      <Button title="en" onPress={() => setLanguage("en")} />
      <Button title="arMasculine" onPress={() => setLanguage("arMasculine")} />
      <Button title="arFeminine" onPress={() => setLanguage("arFeminine")} />
    </View>
  );
};

export default App;
