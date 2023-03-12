export interface OptionsProps<T> {
  options: T[];
  cn?: string;
  optionCN?: string;
  translate?: boolean;
  signalSelect?: {
    selectedOption: T;
    setSelectedOption: (option: T) => void;
  };
}
