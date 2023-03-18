import { useContext } from "react";
import { CustomerContext } from "../contexts";

const useCustomerContext = () => {
  return useContext(CustomerContext);
};

export default useCustomerContext;
