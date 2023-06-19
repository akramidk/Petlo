export interface AutoshipsResponse {
  has_more: boolean;
  data: {
    public_id: string;
    name: string;
    status: string;
    next_shipment_on: string;
  }[];
}
