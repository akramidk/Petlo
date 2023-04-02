import { SectionItem } from "./SectionItem";

export interface Section {
  name: string;
  category: string;
  items: {
    has_more: boolean;
    data: SectionItem[];
  };
}
