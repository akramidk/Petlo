import { useContext } from "react";
import { TranslationsContext } from "../contexts";

const useTranslationsContext = () => {
  return useContext(TranslationsContext);
};

export default useTranslationsContext;
