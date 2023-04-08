import { Cart } from "../Entities/Cart";
import { BaseResponse } from "./Base";

export interface CartAddItemRequest {
  item_id: string;
  variant_id: string;
}

export interface CartAddItemResponse extends BaseResponse {
  cart: Cart;
}
