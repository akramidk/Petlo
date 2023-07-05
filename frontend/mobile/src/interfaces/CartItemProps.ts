import { buttonStatus } from "../types";

export interface CartItemProps {
  itemId: string;
  variantId: string;
  options: string[];
  name: string;
  image: string;
  quantity: number;
  amount: string;

  //HACK temporary to the autoship items
  variantPrice?: string;
}
