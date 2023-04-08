import { create } from "zustand";

interface CartStore {
  numberofItems: number;
  setNumberofItems: (numberofItems: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  numberofItems: 0,
  setNumberofItems: (numberofItems) =>
    set(() => ({ numberofItems: numberofItems })),
}));

export default useCartStore;
