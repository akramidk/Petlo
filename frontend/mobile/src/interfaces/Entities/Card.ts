export interface Card {
  public_id: string;
  brand:
    | "american express"
    | "diners club"
    | "discover"
    | "jcb"
    | "mastercard"
    | "unionpay"
    | "visa";
  last4: string;
  exp_month: number;
  exp_year: number;
}
