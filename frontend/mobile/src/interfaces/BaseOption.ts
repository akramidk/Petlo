import React from "react";

export interface BaseOption {
  id: number | string;
  value: string | React.ReactNode;
  disable?: boolean;
  helperText?: string;
}
