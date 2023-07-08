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
  currency: string;
}
