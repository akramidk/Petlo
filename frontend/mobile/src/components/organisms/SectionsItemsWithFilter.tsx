import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Endpoints } from "../../enums";
import { useAPIFetching, useInternationalizationContext } from "../../hooks";
import { Section, SectionsResponse } from "../../interfaces";
import { BaseButton } from "../bases";
import { Text } from "../atoms";
import { Loading } from "../pages";
import { Item } from "../molecules";

interface SectionsItemsWithFilterProps {
  onItemClick: (publicId: string) => void;
}

const SectionsItemsWithFilter = ({
  onItemClick,
}: SectionsItemsWithFilterProps) => {
  const { direction } = useInternationalizationContext();

  const [selectedSection, setSelectedSection] = useState<Section>();
  const scrollViewRef = useRef<ScrollView>();

  const { response } = useAPIFetching<{ limit: number }, SectionsResponse>({
    endpoint: Endpoints.SECTIONS,
    body: {
      limit: 100,
    },
  });

  useEffect(() => {
    if (response.isFetching) return;
    setSelectedSection(response.body.data[0]);
  }, [response]);

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <View className="h-full pt-[28px] pb-[72px] space-y-[16px]">
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
      >
        <View className="px-[28px] flex flex-row">
          {response.body.data.map((section, index) => {
            return (
              <View key={index}>
                <BaseButton
                  onClick={() => {
                    setSelectedSection(section);
                  }}
                  cn={clsx(
                    "px-[28px] py-[8px] border-[1.4px] rounded-[4px]",
                    direction === "ltr" ? "mr-[4px]" : "ml-[4px]",
                    section.category === selectedSection?.category
                      ? "border-[#0E333C]"
                      : "border-[#f6f6f6]"
                  )}
                >
                  <Text font="semiBold" cn="text-[#0E333C] text-[13px]">
                    {section.name}
                  </Text>
                </BaseButton>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <ScrollView className="grow px-[28px] space-y-[12px]">
        {selectedSection?.items?.data?.map?.((item, index) => {
          return (
            <View key={index}>
              <Item
                variant="large"
                data={item}
                onClick={() => onItemClick(item.public_id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SectionsItemsWithFilter;
