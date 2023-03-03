import { useContext } from "react";
import { SettingsContext } from "../contexts";

const useSettingsContext = () => {
  return useContext(SettingsContext);
};

export default useSettingsContext;
