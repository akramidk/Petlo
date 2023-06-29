import React from "react";

export interface BaseSelectorProps<T> {
  placeholder?: string;
  value: string | number | React.ReactNode;
  translate?: boolean;
  cn?: string;
  onClick: (visible: boolean) => void;
  showDropdownIcon?: boolean;
  preventRTL?: boolean;
}
