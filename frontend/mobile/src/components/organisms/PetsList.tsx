import { View, ScrollView } from "react-native";
import { Text, Link } from "../atoms";
import { useAPIFetching, useInternationalizationContext } from "../../hooks";
import { Endpoints } from "../../enums";
import { CategoriesResponse } from "../../interfaces";
import { useRef } from "react";
import clsx from "clsx";

interface PetsList {
  title?: string;
}

const PetsList = ({ title }: PetsList) => {
  const { direction } = useInternationalizationContext();
  const scrollViewRef = useRef<ScrollView>();
  const { response } = useAPIFetching<unknown, CategoriesResponse>({
    endpoint: Endpoints.CATEGORIES,
  });

  return (
    <View>
      {title && (
        <Text cn="text-[15px] text-[#0E333C] mb-[8px]" font="extraBold">
          {title}
        </Text>
      )}

      <ScrollView
        className={clsx(direction === "ltr" ? "self-start" : "self-end")}
        ref={scrollViewRef}
        contentContainerStyle={{
          flexDirection: direction === "ltr" ? "row" : "row-reverse",
        }}
        onContentSizeChange={
          direction === "rtl"
            ? () => scrollViewRef.current?.scrollToEnd({ animated: false })
            : undefined
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {response?.body?.data
          ?.filter((pet) => pet.parent_public_id === null)
          ?.map((pet, index) => {
            return (
              <View
                key={index}
                className={clsx(
                  "bg-[#fff] border-[1px] border-[#f6f6f6] w-[200px] h-[312px] rounded-[4px]",
                  direction === "ltr" ? "mr-[8px]" : "ml-[8px]"
                )}
              >
                <Text>{pet.name ?? index}</Text>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default PetsList;
