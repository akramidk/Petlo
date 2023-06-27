export interface Payment {
  method: "cash" | "card";
  card?: {
    id: string;
  };
}
