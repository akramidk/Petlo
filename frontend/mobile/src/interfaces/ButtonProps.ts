import { BaseButtonProps } from "./BaseButtonProps";
import { buttonStatus } from "../types";
export interface ButtonProps extends Pick<BaseButtonProps, "onClick" | "cn"> {
  value: string;
  status?: buttonStatus;
}
