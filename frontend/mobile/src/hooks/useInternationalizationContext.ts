import { useContext } from "react";
import { InternationalizationContext } from "../contexts";

const useInternationalizationContext = () => {
  return useContext(InternationalizationContext);
};

export default useInternationalizationContext;
