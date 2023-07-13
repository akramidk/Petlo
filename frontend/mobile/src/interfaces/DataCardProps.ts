import React from "react";
import { BaseButtonProps } from "./BaseButtonProps";

export interface DataCardProps {
  primaryText: string;
  helperText?: string;
  secondaryText?: string;
  actions?: ({
    name: string;
  } & Pick<BaseButtonProps, "onClick">)[];
  prefixChild?: React.ReactNode;
  withoutContainerStyles?: boolean;
}
