export interface AutoshipsResponse {
  has_more: boolean;
  data: {
    public_id: string;
    name: string;
    status: "active" | "inactive" | "deactivated";
    next_shipment_on: string;
    address_id: string;
    pets: string[];
  }[];
}
