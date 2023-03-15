import { I18n, Scope, TranslateOptions } from "i18n-js";
import en from "../locales/en.json";
import ar_masculine from "../locales/ar_masculine.json";
import ar_feminine from "../locales/ar_feminine.json";
import { language } from "../types";
import { DEFAULT_APP_LANGUAGE } from "../constants";

interface useTranslationsProps {
  language: language;
}

const useTranslations = ({ language }: useTranslationsProps) => {
  const i18n = new I18n(
    { en, ar_masculine, ar_feminine },
    {
      enableFallback: true,
      defaultLocale: DEFAULT_APP_LANGUAGE.withGender,
      locale: language,
    }
  );

  const t = (scope: Scope, options?: TranslateOptions) =>
    i18n.t(scope, options);

  return { t };
};

export default useTranslations;
