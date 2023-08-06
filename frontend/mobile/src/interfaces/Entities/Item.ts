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
    values: {
      value: string;
      unit: string | null;
    }[];
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
