import { useContext } from "react";
import { DataContext } from "../contexts";

const useDataContext = () => {
  return useContext(DataContext);
};

export default useDataContext;
