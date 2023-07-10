import { BaseResponse } from "./Base";

export interface ReactivateAnAutoshipRequest {
  recurring_interval: "day" | "month";
  recurring_interval_count: number;
  next_shipment_on: string;
}

export interface ReactivateAnAutoshipResponse extends BaseResponse {}
