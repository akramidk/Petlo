import Swipeable from "react-native-gesture-handler/Swipeable";
import { Banner } from "../../../src/interfaces";
import { Text, View } from "react-native";
import { useCallback, useState } from "react";
import { StyleSheet, StyleProp } from "react-native";
import clsx from "clsx";
import { BaseButton } from "../../../src/components/bases";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

interface BannersProps {
  data: Banner[];
}

// TODO should add animation when swipe
// TODO should auto swipe
// TODO fix ar/en

const Banners = ({ data }: BannersProps) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const imageProps = {
    style: {
      flex: 1,
      borderRadius: 4,
    } as StyleProp<any>,
  };

  const renderChildBanner = useCallback(() => {
    return (
      <BaseButton
        onClick={() => router.push(data[index].path)}
        cn="h-[100%] w-[100%]"
      >
        <Image
          source={{
            uri: data[index].image,
          }}
          contentFit="cover"
          {...imageProps}
        />
      </BaseButton>
    );
  }, [index]);

  const onSwipe = (direction: "left" | "right") => {
    if (
      (index === 0 && direction === "left") ||
      (index + 1 === data.length && direction === "right")
    )
      return;

    setIndex(direction === "right" ? index + 1 : index - 1);
  };

  return (
    <View className="mx-[28px] rounded-[4px]">
      {data.length > 1 && (
        <View className="absolute z-10 flex-row space-x-[4px] bottom-0 right-0 mb-[12px] mr-[12px]">
          {data.map((item, i) => {
            return (
              <View
                key={i}
                className={clsx(
                  "bg-[#0E333C] w-[8px] h-[8px] rounded-full border-[1px]",
                  i === index
                    ? "opacity-100 border-[#888]"
                    : "opacity-50 border-[#444]"
                )}
              />
            );
          })}
        </View>
      )}

      <Swipeable
        childrenContainerStyle={{
          height: 136,
          width: "100%",
        }}
        onSwipeableWillClose={onSwipe}
      >
        {renderChildBanner()}
      </Swipeable>
    </View>
  );
};

export default Banners;
