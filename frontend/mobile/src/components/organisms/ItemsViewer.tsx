import clsx from "clsx";
import React from "react";
import { View } from "react-native";
import { useInternationalizationContext } from "../../hooks";
import { CartItemProps } from "../../interfaces";
import { Text } from "../atoms";
import { ActivityIndicator } from "react-native-paper";

interface ItemsViewerProps {
  items: CartItemProps[];
  renderItem: (item: CartItemProps) => React.ReactNode;
  detailsTranslationValue: string;
  totalTranslationValue: string;
  total2TranslationValue?: string;
  amount?: string;
  amount2?: string;
  currency?: string;
  isAmountLoading?: boolean;
  isAmount2Loading?: boolean;
}

const ItemsViewer = ({
  items,
  renderItem,
  detailsTranslationValue,
  totalTranslationValue,
  total2TranslationValue,
  amount,
  amount2,
  currency,
  isAmountLoading,
  isAmount2Loading,
}: ItemsViewerProps) => {
  const { direction } = useInternationalizationContext();

  return (
    <View className="space-y-[28px]">
      <View className="space-y-[20px]">
        {items?.map((item, i) => {
          return <View key={i}>{renderItem(item)}</View>;
        })}
      </View>

      {((amount && amount !== "0.00") || isAmountLoading) && (
        <View>
          <Text font="extraBold" cn="text-[15px] text-[#0E333C] mb-[12px]">
            {detailsTranslationValue}
          </Text>

          <View className="space-y-[10px]">
            <View
              className={clsx(
                "justify-between",
                direction === "ltr" ? "flex-row" : "flex-row-reverse"
              )}
            >
              <Text font="semiBold" cn="text-[14px] text-[#666]">
                {totalTranslationValue}
              </Text>
              <Text font="semiBold" cn="text-[14px] text-[#666]">
                {isAmountLoading ? (
                  <ActivityIndicator animating={true} color="#666" size={14} />
                ) : (
                  `${amount} ${currency}`
                )}
              </Text>
            </View>

            {total2TranslationValue && (
              <View
                className={clsx(
                  "justify-between",
                  direction === "ltr" ? "flex-row" : "flex-row-reverse"
                )}
              >
                <Text font="semiBold" cn="text-[14px] text-[#666]">
                  {total2TranslationValue}
                </Text>
                <Text font="semiBold" cn="text-[14px] text-[#666]">
                  {isAmount2Loading ? (
                    <ActivityIndicator
                      animating={true}
                      color="#666"
                      size={14}
                    />
                  ) : (
                    `${amount2} ${currency}`
                  )}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemsViewer;
