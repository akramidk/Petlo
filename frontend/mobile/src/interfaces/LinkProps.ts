export interface LinkProps {
  onClick: () => void;
  value: string;
  status?: "active" | "inactive" | "loading" | "succeeded" | "failed";
  cn?: string;
  valueCN?: string;
}
