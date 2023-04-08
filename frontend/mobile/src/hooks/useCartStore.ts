import { create } from "zustand";
import { Cart } from "../interfaces";

interface CartStore {
  cartId: string | undefined | null;
  setCartId: (cartId: string | null) => void;
  numberofItems: number;
  setNumberofItems: (numberofItems: number) => void;
  summary: Cart | undefined;
  setSummary: (summary: Cart) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cartId: undefined,
  setCartId: (cartId) => set(() => ({ cartId: cartId })),
  numberofItems: 0,
  setNumberofItems: (numberofItems) =>
    set(() => ({ numberofItems: numberofItems })),
  summary: undefined,
  setSummary: (summary) => set(() => ({ summary: summary })),
}));

export default useCartStore;
