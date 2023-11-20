import { View, ScrollView } from "react-native";
import { Text } from "../atoms";
import { useAPIFetching, useInternationalizationContext } from "../../hooks";
import { Endpoints } from "../../enums";
import { CategoriesResponse, PetsListProps } from "../../interfaces";
import React, { Fragment, useRef, useState } from "react";
import clsx from "clsx";
import { Skeleton as MotiSkeleton } from "moti/skeleton";
import BaseButton from "../bases/BaseButton";
import { Image as ExpoImage } from "expo-image";

const PetsList = ({ title, onPetClick }: PetsListProps) => {
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
              <Fragment key={index}>
                <Image
                  onClick={() => onPetClick(pet)}
                  uri={pet.image}
                  direction={direction}
                />
              </Fragment>
            );
          })}

        {!response?.body?.data &&
          [...Array(2)].map((_, index) => {
            return (
              <View
                key={index}
                className={direction === "ltr" ? "mr-[4px]" : "ml-[4px]"}
              >
                <Skeleton />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

interface Skeleton {
  children?: React.ReactElement;
  show?: boolean;
}

const Skeleton = ({ children, show = true }: Skeleton) => {
  return (
    <MotiSkeleton
      show={show}
      height={384}
      width={216}
      colorMode="light"
      radius={4}
      transition={{
        type: "timing",
        duration: 3000,
      }}
      backgroundColor="#f9f9f9"
    >
      {children}
    </MotiSkeleton>
  );
};

interface Image {
  onClick: () => void;
  uri: string;
  direction: string;
}
const Image = ({ onClick, uri, direction }: Image) => {
  const [loading, setLoading] = useState(true);

  return (
    <BaseButton
      className={clsx(
        "w-[216px] h-[384px] rounded-[4px]",
        direction === "ltr" ? "mr-[4px]" : "ml-[4px]"
      )}
      onClick={onClick}
    >
      <Skeleton show={loading}>
        <ExpoImage
          style={{
            height: "100%",
            width: "100%",
          }}
          source={{
            uri: uri,
          }}
          contentFit="cover"
          className="rounded-[4px]"
          onLoad={() => setLoading(false)}
        />
      </Skeleton>
    </BaseButton>
  );
};

export default PetsList;
