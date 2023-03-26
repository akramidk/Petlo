import clsx from "clsx";
import { useMemo } from "react";
import { View } from "react-native";
import { useInternationalizationContext } from "../../hooks";
import { DataCardProps } from "../../interfaces";
import { Text } from "../atoms";
import { BaseButton } from "../bases";

const DataCard = ({
  primaryText,
  secondaryText,
  actions,
  prefixChild,
}: DataCardProps) => {
  const { direction } = useInternationalizationContext();
  const flex = useMemo(() => {
    return direction === "ltr" ? "flex-row" : "flex-row-reverse";
  }, [direction]);

  return (
    <View
      className={clsx(
        "w-full border-[1px] border-[#f6f6f6] rounded-[4px] px-[20px] py-[14px]",
        flex
      )}
    >
      {prefixChild}

      <View className="space-y-[8px]">
        <View className={clsx("justify-between", flex)}>
          <Text
            font="extraBold"
            cn="text-[14px] text-[#0E333C] w-[70%]"
            numberOfLines={1}
          >
            {primaryText}
          </Text>

          {actions && actions.length === 1 ? (
            <BaseButton onClick={actions[0].onClick}>
              <Text font="semiBold" cn=" text-[14px] text-[#aaa]">
                {actions[0].name}
              </Text>
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
