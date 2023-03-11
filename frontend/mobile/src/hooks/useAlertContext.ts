import { useContext } from "react";
import { AlertContext } from "../contexts";

const useAlertContext = () => {
  return useContext(AlertContext);
};

export default useAlertContext;
