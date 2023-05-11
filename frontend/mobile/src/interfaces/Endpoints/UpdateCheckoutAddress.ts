import { Checkout } from "../Entities/Checkout";
import { BaseResponse } from "./Base";

export interface UpdateCheckoutAddressRequest {
  address_id: string;
}

export interface UpdateCheckoutAddressResponse extends BaseResponse {
  checkout: Checkout;
}
