import { Card } from "./Card";

export interface Payment {
  method: "cash" | "card";
  card?: Partial<Card>;
}
