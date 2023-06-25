import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface BottomSheetOptionsProps {
  visible: boolean;
  onClose: () => void;
}

const BottomSheetOptions = ({ visible, onClose }: BottomSheetOptionsProps) => {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ margin: 0 }}
      isVisible={visible}
    >
      <BottomSheet
        snapPoints={["40%"]}
        onClose={onClose}
        animateOnMount
        enablePanDownToClose
      >
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
      </BottomSheet>
    </Modal>
  );
};

export default BottomSheetOptions;
