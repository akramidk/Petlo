import { BaseResponse } from "./Base";

export interface UpdateAutoshipDateRequest {
  recurring_interval: "day" | "month";
  recurring_interval_count: number;
  next_shipment_on: string;
}

export interface UpdateAutoshipDateResponse extends BaseResponse {}
