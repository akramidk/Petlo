import { Text } from "react-native";
import clsx from "clsx";
import { useContext } from "react";
import { TranslationsContext } from "../src/contexts";

const App = () => {
  const t = useContext(TranslationsContext);

  return (
    <Text className={clsx("text-[36px] text-[#db3d3d]")}>
      {t("APP_LANGUAGE_TITLE")}
    </Text>
  );
};

export default App;
