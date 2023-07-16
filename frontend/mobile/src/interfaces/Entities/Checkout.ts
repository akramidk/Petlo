export interface Checkout {
  public_id: string;
  cart_amount: string;
  usd_cart_amount: string;
  delivery_amount: string | null;
  usd_delivery_amount: string | null;
  delivery_estimation: string | null;
  amount: string;
  usd_amount: string;
  currency: string;
}
