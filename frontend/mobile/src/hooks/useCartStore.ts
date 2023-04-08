import { create } from "zustand";
import { Cart } from "../interfaces";

interface CartStore {
  cartId: string | undefined | null;
  setCartId: (cartId: string | null) => void;
  numberofItems: number;
  setNumberofItems: (numberofItems: number) => void;
  summary: Cart | undefined;
}

const useCartStore = create<CartStore>((set) => ({
  cartId: undefined,
  setCartId: (cartId) => set(() => ({ cartId: cartId })),
  numberofItems: 0,
  setNumberofItems: (numberofItems) =>
    set(() => ({ numberofItems: numberofItems })),
  summary: undefined,
}));

export default useCartStore;
