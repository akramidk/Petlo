import { I18n, Scope, TranslateOptions } from "i18n-js";
import en from "../locales/en.json";
import arMasculine from "../locales/arMasculine.json";
import arFeminine from "../locales/arFeminine.json";

interface useTranslationsProps {
  locale: string;
}

const useTranslations = ({ locale }: useTranslationsProps) => {
  const i18n = new I18n(
    { en, arMasculine, arFeminine },
    { enableFallback: true, defaultLocale: "en", locale: locale }
  );

  const t = (scope: Scope, options?: TranslateOptions) =>
    i18n.t(scope, options);

  return t;
};

export default useTranslations;
