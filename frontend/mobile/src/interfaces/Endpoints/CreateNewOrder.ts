import { Payment } from "../Entities/Payment";
import { BaseResponse } from "./Base";

export interface CreateNewOrderRequest {
  checkout_id: string;
  payment: Payment;
  pets: string[];
}

export interface CreateNewOrderResponse extends BaseResponse {}
