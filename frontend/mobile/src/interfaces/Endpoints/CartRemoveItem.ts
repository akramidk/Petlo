import { Cart } from "../Entities/Cart";
import { BaseResponse } from "./Base";

export interface CartRemoveItemRequest {
  item_id: string;
  variant_id: string;
}

export interface CartRemoveItemResponse extends BaseResponse {
  cart: Cart;
}
