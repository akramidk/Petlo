export interface Order {
  id: string;
  public_id: string;
  autoship: string | null;
  status: string;
  date: string;
  amount: string;
  currency: string;
  payment: {
    method: string;
  };
}
