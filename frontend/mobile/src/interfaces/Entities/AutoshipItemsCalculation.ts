export interface AutoshipItemsCalculation {
  items: {
    public_id: string;
    name: string;
    image: string;
    variants: {
      public_id: string;
      available: boolean;
      options: string[];
      quantity: number;
      amount: string;
    }[];
  }[];
  amount: string;
  usd_amount: string;
  amount_after_discount: string;
  usd_amount_after_discount: string;
  currency: string;
}
