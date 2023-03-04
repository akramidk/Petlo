import { View } from "react-native";
import clsx from "clsx";
import { useTranslationsContext } from "../src/hooks";
import Text from "../src/components/atoms/Text";
import { OptionsSelector } from "../src/components/molecules";
import { useState } from "react";
import { Form } from "../src/components/organisms";

const SelectLanguage = () => {
  const { t } = useTranslationsContext();
  const [selectedLanguage, setSelectedLanguage] = useState<
    undefined | number | string
  >();

  return (
    <Form
      title={t("SELECT_LANGUAGE_TITLE")}
      helperText={t("SELECT_LANGUAGE_HELPER_TEXT")}
    >
      <OptionsSelector
        options={t("SELECT_LANGUAGE_LANGUAGES")}
        signalSelect={{
          selectedOption: selectedLanguage,
          setSelectedOption: setSelectedLanguage,
        }}
      />
    </Form>
  );
};

export default SelectLanguage;
