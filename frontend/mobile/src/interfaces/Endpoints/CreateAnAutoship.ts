import { BaseResponse } from "./Base";

export interface CreateAnAutoshipRequest {
  name: string;
  recurring_interval: "day" | "month";
  recurring_interval_count: number;
  next_shipment_on: string;
  address_id: string;
  items: { id: string; variant_id: string; quantity: number };
  payment: {
    method: "cash" | "card";
    card?: {
      id: string;
    };
  };
  pets: string[];
}

export interface CreateAnAutoshipResponse extends BaseResponse {}
