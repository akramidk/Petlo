import { useRouter } from "expo-router";
import { useState } from "react";
import { PageStructure } from "../../src/components/organisms";
import {
  LANGUAGES_OPTIONS,
  LANGUAGE_ADJECTIVES_OPTIONS,
} from "../../src/constants";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../src/hooks";
import { BaseOption, LanguageOption } from "../../src/interfaces";
import { Options } from "../../src/components/atoms";
import { language } from "../../src/types";
import RNRestart from "react-native-restart";

const ChangeLanguage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { t } = useTranslationsContext();

  const {
    language: currentLanguage,
    languageWithoutGender: currentLanguageWithoutGender,
    languageGender: currentLanguageGender,
    changeLanguage,
  } = useInternationalizationContext();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    LANGUAGES_OPTIONS.find(
      (language) => language.id === currentLanguageWithoutGender
    )
  );
  const [selectedAdjective, setSlectedAdjective] = useState<BaseOption>(
    LANGUAGE_ADJECTIVES_OPTIONS.find(
      (adjective) => adjective.id === currentLanguageGender
    )
  );

  const languageHandler = () => {
    if (selectedLanguage.gendered) {
      setStep(2);

      if (selectedLanguage.id !== currentLanguageWithoutGender)
        changeLanguage(`${selectedLanguage.id}_masculine` as language, false);

      return;
    }

    changeLanguage(selectedLanguage.id as language, true);

    RNRestart.restart();
  };

  const adjectiveHandler = () => {
    changeLanguage(
      `${selectedLanguage.id}_${selectedAdjective.id}` as language,
      true
    );

    RNRestart.restart();
  };

  if (step === 1) {
    return (
      <PageStructure
        title={t("CHANGE_LANGUAGE__TITLE")}
        helperText={t("CHANGE_LANGUAGE__HELPER_TEXT")}
        backButton={router.back}
        button={{
          value: selectedLanguage.gendered
            ? t("CHANGE_LANGUAGE__CONTINUE_BUTTON")
            : t("CHANGE_LANGUAGE__SAVE_BUTTON"),
          onClick: languageHandler,
          status:
            selectedLanguage.id !== currentLanguage ? "active" : "inactive",
        }}
      >
        <Options<LanguageOption>
          options={LANGUAGES_OPTIONS}
          signalSelect={{
            selectedOption: selectedLanguage,
            setSelectedOption: setSelectedLanguage,
          }}
          translate
        />
      </PageStructure>
    );
  }

  if (step === 2) {
    return (
      <PageStructure
        title={t("CHANGE_LANGUAGE__TITLE")}
        helperText={t("CHANGE_LANGUAGE_PRONOUN_HELPER_TEXT")}
        button={{
          value: t("CHANGE_LANGUAGE__SAVE_BUTTON"),
          onClick: adjectiveHandler,
          status:
            selectedAdjective !== currentLanguageGender ? "active" : "inactive",
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
      </PageStructure>
    );
  }
};

export default ChangeLanguage;
