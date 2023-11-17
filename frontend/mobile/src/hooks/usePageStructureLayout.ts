import { useContext } from "react";
import { PageStructureLayoutContext } from "../contexts";

const usePageStructureLayout = () => {
  return useContext(PageStructureLayoutContext);
};

export default usePageStructureLayout;
