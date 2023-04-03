import { BriefItem } from "./BriefItem";

export interface Section {
  name: string;
  category: string;
  items: {
    has_more: boolean;
    data: BriefItem[];
  };
}
