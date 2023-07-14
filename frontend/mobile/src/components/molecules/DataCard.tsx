import clsx from "clsx";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { useInternationalizationContext } from "../../hooks";
import { DataCardProps } from "../../interfaces";
import { Icon, Text } from "../atoms";
import { BaseButton } from "../bases";
import BottomSheetOptions from "./BottomSheetOptions";

const DataCard = ({
  primaryText,
  helperText,
  secondaryText,
  actions = [],
  prefixChild,
  withoutContainerStyles = false,
}: DataCardProps) => {
  const { direction } = useInternationalizationContext();
  const flex = useMemo(() => {
    return direction === "ltr" ? "flex-row" : "flex-row-reverse";
  }, [direction]);

  const [actionsVisible, setActionsVisible] = useState(false);

  return (
    <View
      className={clsx(
        {
          ["w-full border-[1px] border-[#f6f6f6] rounded-[4px] px-[20px] pb-[14px]"]:
            !withoutContainerStyles,
        },
        prefixChild && flex // TODO fix this
      )}
    >
      {prefixChild}

      <BottomSheetOptions
        visible={actionsVisible}
        onClose={() => setActionsVisible(false)}
        actions={actions}
      />

      <View className="space-y-[8px]">
        <View className={clsx("justify-between items-center", flex)}>
          <View
            className={clsx("flex-wrap w-[70%] mt-[14px] items-center", flex)}
          >
            <Text
              font="extraBold"
              cn="text-[14px] text-[#0E333C]"
              numberOfLines={1}
            >
              {primaryText}
            </Text>

            {helperText && (
              <Text
                font="medium"
                cn={clsx(
                  "text-[14px] text-[#888]",
                  direction === "ltr" ? "ml-[4px]" : "mr-[4px]"
                )}
              >
                ({helperText})
              </Text>
            )}
          </View>

          {actions && actions.length === 1 ? (
            <BaseButton onClick={actions[0].onClick} cn="pt-[14px]">
              <Text font="semiBold" cn=" text-[14px] text-[#aaa]">
                {actions[0].name}
              </Text>
            </BaseButton>
          ) : null}

          {actions && actions.length > 1 ? (
            <BaseButton onClick={() => setActionsVisible(true)} cn="pt-[14px]">
              <Icon name="moreHorizontal" size={20} color="#888" />
            </BaseButton>
          ) : null}
        </View>

        {secondaryText && (
          <Text font="medium" cn="text-[14px] text-[#777]" numberOfLines={1}>
            {secondaryText}
          </Text>
        )}
      </View>
    </View>
  );
};

export default DataCard;
