import React from "react";

export interface BaseLabelProps {
  name: string;
  helperText?: string;
  bottomHelperElement?: React.ReactNode;
  require?: boolean;
  cn?: string;
}
