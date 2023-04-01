export interface CustomerAddressesRequest {
  page: number;
}

export interface CustomerAddressesResponse {
  has_more: boolean;
  data: {
    public_id: string;
    name: string;
    details: string | null;
  }[];
}
