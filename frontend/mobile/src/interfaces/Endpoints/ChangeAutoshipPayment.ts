import { BaseResponse } from "./Base";

export interface ChangeAutoshipPaymentRequest {
  method: "cash" | "card";
  card?: {
    id?: string;
  };
}

export interface ChangeAutoshipPaymentResponse extends BaseResponse {}
