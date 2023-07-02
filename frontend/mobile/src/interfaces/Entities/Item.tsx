export interface Item {
  public_id: string;
  name: string;
  brand: string;
  image: string;
  available: boolean;
  currency: string;
  options: {
    public_id: string;
    name: string;
    unit: string | null;
    values: string[];
  }[];
  variants: {
    public_id: string;
    price: string;
    available: boolean;
    options: {
      public_id: string;
      name: string;
      value: string;
    }[];
  }[];
}
