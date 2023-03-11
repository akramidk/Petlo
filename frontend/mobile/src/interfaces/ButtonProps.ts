type buttonStatus = "active" | "inactive" | "loading" | "succeeded" | "failed";

export interface ButtonProps {
  value: string;
  status?: buttonStatus;
  onClick: () => void;
}
