import { Checkout } from "../Entities/Checkout";
import { BaseResponse } from "./Base";

export interface CreateNewCheckoutRequest {
  cart_id: string;
  address_id?: string;
}

export interface CreateNewCheckoutResponse extends BaseResponse {
  checkout: Checkout;
}
