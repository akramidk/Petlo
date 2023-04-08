import { buttonStatus } from "../types";

export interface CartItemProps {
  options: string[];
  name: string;
  image: string;
  quantity: number;
  amount: string;
  add: () => void;
  addStatus: buttonStatus;
  remove: () => void;
}
