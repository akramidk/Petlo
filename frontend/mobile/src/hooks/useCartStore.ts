import { create } from "zustand";

interface CartStore {
  cartId: string | undefined | null;
  setCartId: (cartId: string | null) => void;
  numberofItems: number;
  setNumberofItems: (numberofItems: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cartId: undefined,
  setCartId: (cartId) => set(() => ({ cartId: cartId })),
  numberofItems: 0,
  setNumberofItems: (numberofItems) =>
    set(() => ({ numberofItems: numberofItems })),
}));

export default useCartStore;
