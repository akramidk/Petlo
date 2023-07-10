import { BaseResponse } from "./Base";

export interface ChangeAutoshipPaymentRequest {
  payment: {
    method: "cash" | "card";
    card?: {
      id?: string;
    };
  };
}

export interface ChangeAutoshipPaymentResponse extends BaseResponse {}
