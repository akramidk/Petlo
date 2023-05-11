import { BaseResponse } from "./Base";

export interface CreateNewOrderRequest {
  checkout_id: string;
  payment: {
    method: "cash" | "card";
    card?: {
      id: string;
    };
  };
  pets: string[];
}

export interface CreateNewOrderResponse extends BaseResponse {}
