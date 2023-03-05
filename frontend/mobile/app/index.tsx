import { View } from "react-native";
import clsx from "clsx";
import { useTranslationsContext } from "../src/hooks";
import Text from "../src/components/atoms/Text";

const App = () => {
  const { t } = useTranslationsContext();

  return (
    <View>
      <Text
        className={clsx("text-[36px] text-[#db3d3d]")}
        font={["font-e800", "font-a700"]}
      >
        {t("SELECT_LANGUAGE_TITLE")}
      </Text>
    </View>
  );
};

export default App;
