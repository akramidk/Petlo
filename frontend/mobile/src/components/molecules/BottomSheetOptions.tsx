import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import { useMemo, useRef } from "react";
import { View, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useInternationalizationContext } from "../../hooks";
import { Icon, Text } from "../atoms";
import { BaseButton } from "../bases";

const ACTION_HEIGHT = 60;

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
  const { direction } = useInternationalizationContext();

  const windowHeight = Dimensions.get("window").height;
  const actionsHeight = ACTION_HEIGHT * actions.length + 80;
  const snapPoints = useMemo(
    () =>
      actionsHeight < (windowHeight * 80) / 100 ? [actionsHeight] : ["80%"],
    [windowHeight, actionsHeight]
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
        <BaseButton
          className={clsx(
            "my-[12px] mx-[28px]",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
          onClick={onClose}
        >
          <Icon name="closeCircle" color="#888" size={28} />
        </BaseButton>

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
