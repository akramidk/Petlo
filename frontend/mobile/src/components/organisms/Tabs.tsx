import { View, ScrollView } from "react-native";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useInternationalizationContext } from "../../hooks";
import { BaseButton } from "../bases";
import { Text } from "../atoms";
import { Skeleton } from "moti/skeleton";

interface Tab {
  name: string;
  public_id: string;
}

interface Tabs {
  data: Tab[] | undefined;
  showSkeleton: boolean;
  onTabClick: (tab: Tab) => void;
  selectedTab: Tab | undefined;
}

const Tabs = ({ data, showSkeleton, onTabClick, selectedTab }: Tabs) => {
  const { direction } = useInternationalizationContext();

  const scrollViewRef = useRef<ScrollView>();

  return (
    <ScrollView
      className={direction === "ltr" ? "self-start" : "self-end"}
      ref={scrollViewRef}
      contentContainerStyle={{
        flexDirection: direction === "ltr" ? "row" : "row-reverse",
      }}
      onContentSizeChange={
        direction === "rtl"
          ? () =>
              scrollViewRef.current?.scrollToEnd({
                animated: false,
              })
          : undefined
      }
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex flex-row">
        {data?.map((tab, index) => {
          return (
            <View key={index}>
              <BaseButton
                onClick={() => {
                  onTabClick(tab);
                }}
                cn={clsx(
                  "px-[28px] py-[8px] border-[1.4px] rounded-[4px]",
                  direction === "ltr" ? "mr-[4px]" : "ml-[4px]",
                  tab.public_id === selectedTab?.public_id
                    ? "border-[#0E333C]"
                    : "border-[#f6f6f6]"
                )}
              >
                <Text font="semiBold" cn="text-[#0E333C] text-[13px]">
                  {tab.name}
                </Text>
              </BaseButton>
            </View>
          );
        })}

        {showSkeleton &&
          [...Array(5)].map((_, index) => {
            return (
              <View
                key={index}
                className={clsx(
                  "w-[100px] h-[36px] bg-[#eee] rounded-[4px]",
                  direction === "ltr" ? "mr-[4px]" : "ml-[4px]"
                )}
              >
                <Skeleton
                  show={true}
                  height="100%"
                  colorMode="light"
                  radius={4}
                  transition={{
                    type: "timing",
                    duration: 3000,
                  }}
                  backgroundColor="#f9f9f9"
                  width="100%"
                />
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Tabs;
