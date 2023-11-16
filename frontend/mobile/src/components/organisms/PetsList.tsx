import { View, ScrollView } from "react-native";
import { Text } from "../atoms";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
import { useAPIFetching, useInternationalizationContext } from "../../hooks";
import { Endpoints } from "../../enums";
import { BrandsResponse } from "../../interfaces";
import { BrandsRequest } from "../../interfaces/Endpoints/Brands";
import { useRef } from "react";
import clsx from "clsx";

const PetsList = () => {
  const { width } = useWindowDimensions();
  const { direction } = useInternationalizationContext();
  const scrollViewRef = useRef<ScrollView>();
  const { response } = useAPIFetching<BrandsRequest, BrandsResponse>({
    endpoint: Endpoints.BRANDS,
    options: {
      withPagination: true,
    },
    body: {
      limit: 8,
    },
  });

  return (
    <ScrollView
      className={direction === "ltr" ? "self-start" : "self-end"}
      ref={scrollViewRef}
      contentContainerStyle={{
        paddingHorizontal: 28,
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
      {response?.body?.data?.map((pet, index) => {
        return (
          <View
            key={index}
            className={clsx(
              "bg-[#fff] border-[1px] border-[#f6f6f6] w-[200px] h-[312px]",
              direction === "ltr" ? "mr-[8px]" : "ml-[8px]"
            )}
          >
            <Text>{pet.name}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PetsList;
