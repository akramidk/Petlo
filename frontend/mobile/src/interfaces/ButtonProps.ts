import { BaseButtonProps } from "./BaseButtonProps";

type buttonStatus = "active" | "inactive" | "loading" | "succeeded" | "failed";

export interface ButtonProps extends Pick<BaseButtonProps, "onClick" | "cn"> {
  value: string;
  status?: buttonStatus;
}
