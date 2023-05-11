import { Order } from "../Entities/Order";

export interface OrdersResponse {
  has_more: boolean;
  data: Order[];
}
