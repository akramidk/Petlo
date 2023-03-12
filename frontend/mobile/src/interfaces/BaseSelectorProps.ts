export interface BaseSelectorProps<T> {
  placeholder?: string;
  value: T | undefined;
  translate?: boolean;
  cn?: string;
  setOptionsModalVisible: (visible: boolean) => void;
  showDropdownIcon?: boolean;
  preventRTL?: boolean;
}
