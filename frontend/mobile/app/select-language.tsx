import { View, Text, Button } from "react-native";
import clsx from "clsx";
import { useContext } from "react";
import { SettingsContext, TranslationsContext } from "../src/contexts";

const SelectLanguage = () => {
  const t = useContext(TranslationsContext);
  const { changeLanguage } = useContext(SettingsContext);

  return (
    <View>
      <Text className={clsx("text-[36px] text-[#db3d3d]")}>
        {t("APP_LANGUAGE_TITLE")}
      </Text>

      <Button title="en" onPress={() => changeLanguage("en")} />
      <Button
        title="arMasculine"
        onPress={() => changeLanguage("arMasculine")}
      />
      <Button title="arFeminine" onPress={() => changeLanguage("arFeminine")} />
    </View>
  );
};

export default SelectLanguage;
