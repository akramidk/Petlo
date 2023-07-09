import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Fragment, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Text } from "../atoms";
import { BaseButton } from "../bases";

const ACTION_HEIGHT = 58;

interface BottomSheetOptionsProps {
  visible: boolean;
  onClose: () => void;
  actions: {
    name: string;
    onClick: () => void;
  }[];
}

const BottomSheetOptions = ({
  visible,
  onClose,
  actions,
}: BottomSheetOptionsProps) => {
  const snapPoints = useMemo(
    () =>
      actions.length > 4 ? ["45%"] : [ACTION_HEIGHT * actions.length + 60],
    [actions]
  );

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{ margin: 0 }}
      isVisible={visible}
      onBackdropPress={onClose}
    >
      <BottomSheet
        snapPoints={snapPoints}
        onClose={onClose}
        animateOnMount
        enablePanDownToClose
      >
        <BottomSheetScrollView>
          <View className="divide-y divide-[#f6f6f6] pb-[28px]">
            {actions.map((action, index) => {
              return (
                <View key={index}>
                  <BaseButton onClick={action.onClick} cn="px-[32px] py-[22px]">
                    <Text font="bold" cn="text-[14px] text-[#444]">
                      {action.name}
                    </Text>
                  </BaseButton>
                </View>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </Modal>
  );
};

export default BottomSheetOptions;
