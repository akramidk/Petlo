import { FlashList } from "@shopify/flash-list";
import { Skeleton as MotiSkeleton } from "moti/skeleton";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { usePageStructureLayout } from "../../hooks";
import { BriefItem } from "../../interfaces";
import Item from "../molecules/Item";

interface ItemsList {
  data: BriefItem[] | undefined;
  onItemClick: (item: BriefItem) => void;
  fetchMore: () => void;
  isFetching: boolean;
}

const ItemsList = ({ data, onItemClick, fetchMore, isFetching }: ItemsList) => {
  const ref = useRef({} as FlashList<BriefItem>);
  const scrollToTop = useRef(false);
  const layout = usePageStructureLayout();

  useEffect(() => {
    if (!data) scrollToTop.current = true;

    if (data && scrollToTop.current) {
      ref?.current?.scrollToIndex({
        index: 0,
      });
      scrollToTop.current = false;
    }
  }, [data]);

  return (
    <View style={{ height: layout?.height }}>
      {layout?.height && (
        <FlashList
          ref={ref}
          data={data}
          estimatedItemSize={224}
          renderItem={(item) => {
            return (
              <View key={item.index} className="mb-[8px]">
                <Item
                  variant="large"
                  data={item.item}
                  onClick={() => onItemClick(item.item)}
                />
              </View>
            );
          }}
          onEndReached={fetchMore}
          ListEmptyComponent={
            <View className="space-y-[8px]">
              {[...Array(6)].map((_, index) => {
                return (
                  <View key={index}>
                    <Skeleton />
                  </View>
                );
              })}
            </View>
          }
          ListFooterComponent={isFetching && data ? Skeleton : undefined}
        />
      )}
    </View>
  );
};

const Skeleton = () => {
  return (
    <View className="h-[300px]">
      <MotiSkeleton
        show
        colorMode="light"
        radius={4}
        transition={{
          type: "timing",
          duration: 3000,
        }}
        backgroundColor="#f9f9f9"
        width="100%"
        height="100%"
      />
    </View>
  );
};

export default ItemsList;
