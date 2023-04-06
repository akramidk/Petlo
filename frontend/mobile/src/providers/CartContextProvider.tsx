import { CartContext } from "../contexts";
import { useCart } from "../hooks";

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const { numberOfItems, createStatus, add, addStatus, summary } = useCart();

  return (
    <CartContext.Provider
      value={{ numberOfItems, createStatus, add, addStatus, summary }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
