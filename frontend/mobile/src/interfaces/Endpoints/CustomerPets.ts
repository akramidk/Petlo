export interface CustomerPetsRequest {
  page: number;
}

export interface CustomerPetsResponse {
  has_more: boolean;
  data: {
    public_id: string;
    name: string;
    kind: string;
    breed: string;
    gender: string;
    image: string | null;
  }[];
}
