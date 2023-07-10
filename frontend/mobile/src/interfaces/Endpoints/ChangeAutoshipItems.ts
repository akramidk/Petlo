import { BaseResponse } from "./Base";

export interface ChangeAutoshipItemsRequest {
  items: { id: string; variant_id: string; quantity: number }[];
}

export interface ChangeAutoshipItemsResponse extends BaseResponse {}
