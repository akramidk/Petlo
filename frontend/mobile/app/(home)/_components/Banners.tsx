import Swipeable from "react-native-gesture-handler/Swipeable";
import { Banner } from "../../../src/interfaces";
import { Image, View } from "react-native";
import { useCallback, useState } from "react";
import { StyleSheet, StyleProp } from "react-native";

interface BannersProps {
  data: Banner[];
}

const Banners = ({ data }: BannersProps) => {
  const imageProps = {
    style: {
      flex: 1,
      resizeMode: "cover",
      borderRadius: 4,
    } as StyleProp<any>,
  };

  const [index, setIndex] = useState(0);

  const renderRightBanner = useCallback((index) => {
    return (
      <Image
        source={{
          uri: data[index + 1].image,
        }}
        {...imageProps}
      />
    );
  }, []);

  const renderChildBanner = useCallback(() => {
    return (
      <Image
        source={{
          uri: data[index].image,
        }}
        {...imageProps}
      />
    );
  }, [index]);

  const renderLeftBanner = useCallback(() => {
    return (
      <Image
        source={{
          uri: data[index - 1].image,
        }}
        {...imageProps}
      />
    );
  }, []);

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
