import { CartContext } from "../contexts";
import { useCart } from "../hooks";

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const { add } = useCart();

  return (
    <CartContext.Provider value={{ add }}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
