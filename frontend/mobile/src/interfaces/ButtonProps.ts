type buttonStatus = "active" | "inactive";

export interface ButtonProps {
  value: string;
  status?: buttonStatus;
  onClick: () => void;
}
