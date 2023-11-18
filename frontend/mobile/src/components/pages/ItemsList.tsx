import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Skeleton as MotiSkeleton } from "moti/skeleton";
import { useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import { usePageStructureLayout, useTranslationsContext } from "../../hooks";
import { BriefItem } from "../../interfaces";
import { MoreButton } from "../atoms";
import Item from "../molecules/Item";
import Warning from "../molecules/Warning";

interface ItemsList {
  data: BriefItem[] | undefined;
  onItemClick: (item: BriefItem) => void;
  fetchMore: () => void;
  isFetching: boolean;
  has_more: boolean;
}

const ItemsList = ({
  data,
  onItemClick,
  fetchMore,
  isFetching,
  has_more,
}: ItemsList) => {
  const ref = useRef({} as FlashList<BriefItem>);
  const scrollToTop = useRef(false);
  const layout = usePageStructureLayout();

  const router = useRouter();
  const { t } = useTranslationsContext();

  useEffect(() => {
    if (!data) scrollToTop.current = true;

    if (data && scrollToTop.current) {
      ref?.current?.scrollToIndex?.({
        index: 0,
      });
      scrollToTop.current = false;
    }
  }, [data]);

  const renderFooterComponent = useMemo(() => {
    if (!data) return undefined;
    if (isFetching) return Skeleton;
    if (has_more) {
      return <MoreButton onClick={fetchMore} value="Load More" cn="mb-[8px]" />;
    }
    if (!has_more) {
      return (
        <Warning
          firstText={t("HOME__WARNING_1_FIRST_TEXT")}
          secondText={t("HOME__WARNING_1_SECOND_TEXT")}
          onClick={() => router.push("/request-a-product")}
          containerCN="mb-[8px]"
        />
      );
    }

    return undefined;
  }, [data, isFetching, has_more, router, t, fetchMore]);

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
          ListFooterComponent={renderFooterComponent}
          onEndReachedThreshold={0.5}
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
