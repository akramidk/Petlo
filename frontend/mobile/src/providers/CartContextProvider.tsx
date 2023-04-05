import { CartContext } from "../contexts";
import { useCart } from "../hooks";

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const { createStatus, add, addStatus } = useCart();

  return (
    <CartContext.Provider value={{ createStatus, add, addStatus }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
