import { BaseResponse } from "./Base";

export interface CreateNewCartResponse extends BaseResponse {
  cart: {
    public_id: string;
    exp_at: string;
    number_of_items: number;
    amount: number;
    currency: string;
    items: [];
  };
}
