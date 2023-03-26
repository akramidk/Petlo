export interface CustomerCardsRequest {
  page: number;
}

export interface CustomerCardsResponse {
  has_more: boolean;
  data: {
    public_id: string;
    brand:
      | "amex"
      | "diners"
      | "discover"
      | "jcb"
      | "mastercard"
      | "unionpay"
      | "visa";
    last4: string;
    exp_month: number;
    exp_year: number;
  }[];
}
