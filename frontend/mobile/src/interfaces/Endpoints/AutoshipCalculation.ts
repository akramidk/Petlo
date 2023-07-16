import { AutoshipItemsCalculation } from "../Entities/AutoshipItemsCalculation";
import { BaseResponse } from "./Base";

export interface AutoshipCalculationRequest {
  items: { item_id: string; variant_id: string; quantity: number }[];
  address_id: string;
}

export interface AutoshipCalculationResponse {
  items_amount: string;
  usd_items_amount: string;
  items_amount_after_discount: string;
  usd_items_amount_after_discount: string;
  delivery_amount: string;
  usd_delivery_amount: string;
  total: string;
  usd_total: string;
  currency: string;
}
