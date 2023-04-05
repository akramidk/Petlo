import { useContext } from "react";
import { CartContext } from "../contexts";

const useCartContext = () => {
  return useContext(CartContext);
};

export default useCartContext;
