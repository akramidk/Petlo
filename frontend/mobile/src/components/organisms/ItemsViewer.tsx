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
  detailsTranslationValue?: string;
  totalTranslationValue: string;
  amount?: string;
  currency?: string;
  isAmountLoading?: boolean;
}

const ItemsViewer = ({
  items,
  renderItem,
  detailsTranslationValue,
  totalTranslationValue,
  amount,
  currency,
  isAmountLoading,
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
        </View>
      )}
    </View>
  );
};

export default ItemsViewer;
