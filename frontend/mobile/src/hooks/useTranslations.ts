import { I18n, Scope, TranslateOptions } from "i18n-js";
import en from "../locales/en.json";
import arMasculine from "../locales/arMasculine.json";
import arFeminine from "../locales/arFeminine.json";
import { languages } from "../types";

interface useTranslationsProps {
  language: languages;
}

const useTranslations = ({ language }: useTranslationsProps) => {
  const i18n = new I18n(
    { en, arMasculine, arFeminine },
    { enableFallback: true, defaultLocale: "en", locale: language }
  );

  const t = (scope: Scope, options?: TranslateOptions) =>
    i18n.t(scope, options);

  return { t };
};

export default useTranslations;
