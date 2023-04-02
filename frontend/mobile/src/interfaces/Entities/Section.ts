export interface Section {
  name: string;
  category: string;
  items: {
    has_more: boolean;
    data: {
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
    }[];
  };
}
