import { BaseButtonProps } from "./BaseButtonProps";

export interface DataCardProps {
  primaryText: string;
  secondaryText?: string;
  actions?: ({
    name: string;
  } & Pick<BaseButtonProps, "onClick">)[];
}
