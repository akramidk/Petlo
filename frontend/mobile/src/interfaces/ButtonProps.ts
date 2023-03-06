export interface ButtonProps {
  value: string;
  status?: "active" | "inactive";
  onClick: () => void;
}
