import { useSettingsContext, useTranslationsContext } from "../src/hooks";
import { OptionsSelector } from "../src/components/molecules";
import { useEffect, useState } from "react";
import { Form } from "../src/components/organisms";
import { languagesOptions } from "../src/constants";
import { LanguageOption } from "../src/interfaces";
import { languages } from "../src/types";

const SelectLanguage = () => {
  const { t } = useTranslationsContext();
  const { changeLanguage } = useSettingsContext();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>();
  const [step, setStep] = useState(1);

  const firstStepHandler = () => {
    if (selectedLanguage.gendered) {
      changeLanguage(`${selectedLanguage.id}_masculine` as languages, false);
    } else {
      changeLanguage(selectedLanguage.id as languages, true);
    }
  };

  if (step === 1) {
    return (
      <Form
        title={t("SELECT_LANGUAGE_TITLE")}
        helperText={t("SELECT_LANGUAGE_HELPER_TEXT")}
        button={
          selectedLanguage
            ? {
                value: t(
                  selectedLanguage?.gendered
                    ? "SELECT_LANGUAGE_CONTINUE_BUTTON"
                    : "SELECT_LANGUAGE_SAVE_BUTTON"
                ),
                onClick: firstStepHandler,
              }
            : undefined
        }
      >
        <OptionsSelector<LanguageOption>
          options={languagesOptions}
          signalSelect={{
            selectedOption: selectedLanguage,
            setSelectedOption: setSelectedLanguage,
          }}
          translate
        />
      </Form>
    );
  }

  if (step === 2) {
    return (
      <Form
        title="hellllllllllllllllo"
        helperText={t("SELECT_LANGUAGE_HELPER_TEXT")}
        button={
          selectedLanguage
            ? {
                value: t(
                  selectedLanguage?.gendered
                    ? "SELECT_LANGUAGE_CONTINUE_BUTTON"
                    : "SELECT_LANGUAGE_SAVE_BUTTON"
                ),
                onClick: firstStepHandler,
              }
            : undefined
        }
      >
        <OptionsSelector<LanguageOption>
          options={languagesOptions}
          signalSelect={{
            selectedOption: selectedLanguage,
            setSelectedOption: setSelectedLanguage,
          }}
          translate
        />
      </Form>
    );
  }
};

export default SelectLanguage;
