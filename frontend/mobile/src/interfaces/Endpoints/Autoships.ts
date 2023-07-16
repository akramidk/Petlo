export interface AutoshipsResponse {
  has_more: boolean;
  data: {
    public_id: string;
    name: string;
    status: "active" | "inactive" | "deactivated";
    next_shipment_on: string;
    address_id: string;
    pets: string[];
    items: {
      item_id: string;
      variant_id: string;
      quantity: number;
    }[];
    payment_method: "cash" | "card";
    payment_card_id: string | null;
    recurring_interval_count: number;
    recurring_interval: "day" | "month";
  }[];
}
