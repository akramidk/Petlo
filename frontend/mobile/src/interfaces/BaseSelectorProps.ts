export interface BaseSelectorProps<T> {
  placeholder?: string;
  value: string | number;
  translate?: boolean;
  cn?: string;
  setOptionsModalVisible: (visible: boolean) => void;
  showDropdownIcon?: boolean;
  preventRTL?: boolean;
}
