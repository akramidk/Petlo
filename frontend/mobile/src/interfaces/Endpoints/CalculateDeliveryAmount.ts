export interface CalculateDeliveryAmountRequest {
  address_id: string;
}

export interface CalculateDeliveryAmountResponse {
  amount: string;
  currency: string;
}
