export interface CategoriesResponse {
  data: {
    public_id: string;
    parent_public_id: string | null;
    name: string;
    image: string;
  }[];
}
