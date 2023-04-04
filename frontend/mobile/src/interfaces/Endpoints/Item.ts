export interface ItemResponse {
  public_id: string;
  name: string;
  brand: string;
  image: string;
  available: boolean;
  currency: string;
  options: {
    public_id: string;
    name: string;
    values: string[];
  }[];
  variants: {
    public_id: string;
    price: number;
    available: boolean;
    options: {
      public_id: string;
      name: string;
      value: string;
    }[];
  }[];
}
