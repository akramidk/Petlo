import { BriefItem } from "./BriefItem";

export interface Section {
  name: string;
  category: string;
  brand_public_id: string | null;
  items: {
    has_more: boolean;
    data: BriefItem[];
  };
}
