import { AutoshipItemsCalculation } from "../Entities/AutoshipItemsCalculation";
import { BaseResponse } from "./Base";

export interface CalculateAutoshipItemsAmountRequest {
  data: { item_id: string; variant_id: string; quantity: number }[];
}

export interface CalculateAutoshipItemsAmountResponse
  extends AutoshipItemsCalculation {}
