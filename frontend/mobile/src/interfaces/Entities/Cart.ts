export interface Cart {
  public_id: string;
  number_of_items: number;
  amount: string;
  currency: string;
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
}
