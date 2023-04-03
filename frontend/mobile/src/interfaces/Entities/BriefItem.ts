export interface BriefItem {
  public_id: string;
  name: string;
  brand: string;
  image: string;
  variants: {
    number: number;
    prices: {
      min: number;
      max: number;
      currency: string;
    };
  };
}
