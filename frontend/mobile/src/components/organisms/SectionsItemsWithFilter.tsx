import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Endpoints } from "../../enums";
import { useAPIFetching, useInternationalizationContext } from "../../hooks";
import { SectionsResponse } from "../../interfaces";
import { BaseButton } from "../bases";
import { Text } from "../atoms";
import { Loading } from "../pages";

const SectionsItemsWithFilter = () => {
  const { direction } = useInternationalizationContext();

  const [selectedSection, setSelectedSection] = useState<string>();
  const scrollViewRef = useRef<ScrollView>();

  const { response } = useAPIFetching<void, SectionsResponse>({
    endpoint: Endpoints.SECTIONS,
  });

  useEffect(() => {
    if (response.isFetching) return;
    setSelectedSection(response.body.data[0].category);
  }, [response]);

  if (response.isFetching) {
    return <Loading />;
  }

  return (
    <View>
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
        {response.body.data.map((section, index) => {
          return (
            <View key={index}>
              <BaseButton
                onClick={() => {
                  //
                }}
                cn={clsx(
                  "px-[28px] py-[8px] border-[1.4px] rounded-[4px]",
                  direction === "ltr" ? "mr-[4px]" : "ml-[4px]",
                  section.category === selectedSection
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
      </ScrollView>

      <View></View>
    </View>
  );
};

export default SectionsItemsWithFilter;
