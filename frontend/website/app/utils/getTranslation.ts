import "server-only";

const locales = {
  en: () => import("../locales/en.json").then((module) => module.default),
  ar: () => import("../locales/ar.json").then((module) => module.default),
};

export const getTranslation = async (locale: "en" | "ar") => locales[locale]();
