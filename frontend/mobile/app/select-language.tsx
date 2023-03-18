import { useSettingsContext, useTranslationsContext } from "../src/hooks";
import { Options } from "../src/components/atoms";
import { useState } from "react";
import { Form } from "../src/components/organisms";
import {
  LANGUAGE_ADJECTIVES_OPTIONS,
  LANGUAGES_OPTIONS,
} from "../src/constants";
import { LanguageOption, BaseOption } from "../src/interfaces";
import { language } from "../src/types";

const SelectLanguage = () => {
  const { t } = useTranslationsContext();
  const { changeLanguage } = useSettingsContext();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>();
  const [selectedAdjective, setSlectedAdjective] = useState<BaseOption>();
  const [step, setStep] = useState(1);

  const languageHandler = () => {
    if (selectedLanguage.gendered) {
      setStep(2);
      changeLanguage(`${selectedLanguage.id}_masculine` as language, false);
    } else {
      changeLanguage(selectedLanguage.id as language, true);
    }
  };

  const adjectiveHandler = () => {
    changeLanguage(
      `${selectedLanguage.id}_${selectedAdjective.id}` as language,
      true
    );
  };

  if (step === 1) {
    return (
      <Form
        title={t("SELECT_LANGUAGE__TITLE")}
        helperText={t("SELECT_LANGUAGE__HELPER_TEXT")}
        button={
          selectedLanguage
            ? {
                value: t(
                  selectedLanguage?.gendered
                    ? "SELECT_LANGUAGE__CONTINUE_BUTTON"
                    : "SELECT_LANGUAGE__SAVE_BUTTON"
                ),
                onClick: languageHandler,
              }
            : undefined
        }
      >
        <Options<LanguageOption>
          options={LANGUAGES_OPTIONS}
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
        title={t("SELECT_LANGUAGE_PRONOUN_TITLE")}
        helperText={t("SELECT_LANGUAGE_PRONOUN_HELPER_TEXT")}
        button={{
          value: t("SELECT_LANGUAGE__SAVE_BUTTON"),
          onClick: adjectiveHandler,
          status: selectedAdjective ? "active" : "inactive",
        }}
      >
        <Options
          options={LANGUAGE_ADJECTIVES_OPTIONS}
          signalSelect={{
            selectedOption: selectedAdjective,
            setSelectedOption: setSlectedAdjective,
          }}
          translate
        />
      </Form>
    );
  }
};

export default SelectLanguage;
