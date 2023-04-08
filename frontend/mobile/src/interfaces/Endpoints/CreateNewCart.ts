import { Cart } from "../Entities/Cart";
import { BaseResponse } from "./Base";

export interface CreateNewCartResponse extends BaseResponse {
  cart: Cart;
}
