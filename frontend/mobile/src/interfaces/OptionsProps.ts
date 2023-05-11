import { font } from "../types";

export interface OptionsProps<T> {
  options: T[];
  cn?: string;
  optionCN?: string;
  translate?: boolean;
  optionValueCn?: string;
  optionValueFont?: font;
  signalSelect?: {
    selectedOption: T;
    setSelectedOption: (option: T) => void;
  };
  multipleSelect?: {
    selectedOptions: T[];
    setSelectedOptions: (option: T[]) => void;
  };
  preventDeselection?: boolean;
}
