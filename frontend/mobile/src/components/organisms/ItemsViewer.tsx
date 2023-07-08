import clsx from "clsx";
import React from "react";
import { View } from "react-native";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import { CartItemProps } from "../../interfaces";
import { Text } from "../atoms";

interface ItemsViewerProps {
  items: CartItemProps[];
  renderItem: (item: CartItemProps) => React.ReactNode;
  detailsTranslationValue?: string;
  totalTranslationValue: string;
  amount?: string;
  currency?: string;
}

const ItemsViewer = ({
  items,
  renderItem,
  detailsTranslationValue,
  totalTranslationValue,
  amount,
  currency,
}: ItemsViewerProps) => {
  const { direction } = useInternationalizationContext();

  return (
    <View className="space-y-[28px]">
      <View className="space-y-[20px]">
        {items?.map((item, i) => {
          return <View key={i}>{renderItem(item)}</View>;
        })}
      </View>

      {amount && amount !== "0.00" && (
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
              {amount} {currency}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemsViewer;
