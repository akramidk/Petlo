import { View } from "react-native";
import { Text, Link, MoreButton } from "../atoms";
import { FlashList } from "@shopify/flash-list";
import {
  useAPIFetching,
  usePageStructureLayout,
  useTranslationsContext,
} from "../../hooks";
import { Endpoints } from "../../enums";
import { BrandsListProps, BrandsResponse } from "../../interfaces";
import { BrandsRequest } from "../../interfaces/Endpoints/Brands";
import { BaseButton } from "../bases";
import { Skeleton as MotiSkeleton } from "moti/skeleton";
import { Fragment, useMemo } from "react";
import { Image } from "expo-image";

const ITEM_SIZE = 99;
const NUM_COLUMNS = 2;

const BrandsList = ({
  limit,
  fetchMore = true,
  showAllButton,
  title,
  onShowAllButtonClick,
  onBrandClick,
  featuredBrandsOnly,
}: BrandsListProps) => {
  const { t } = useTranslationsContext();
  const layout = usePageStructureLayout();

  const filterByFeaturedBrands = featuredBrandsOnly
    ? {
        featured: true,
      }
    : undefined;
  const { response, fetchMore: fetchMoreHandler } = useAPIFetching<
    BrandsRequest,
    BrandsResponse
  >({
    endpoint: Endpoints.BRANDS,
    options: {
      withPagination: true,
    },
    body: {
      limit: limit,
      ...filterByFeaturedBrands,
    },
  });

  const height = fetchMore ? layout?.height : (ITEM_SIZE / NUM_COLUMNS) * limit;

  const renderFooterComponent = useMemo(() => {
    if (!response.body?.data) return undefined;
    if (response.isFetching) {
      return (
        <View className="mt-[8px]">
          <Skeleton />
        </View>
      );
    }
    if (response.body?.has_more && fetchMore) {
      return (
        <MoreButton
          onClick={fetchMoreHandler}
          value="Load More"
          cn="mb-[8px]"
        />
      );
    }

    return undefined;
  }, [response, fetchMoreHandler, fetchMore]);

  return (
    <View className="space-y-[8px]">
      {title && (
        <Text cn="text-[15px] text-[#0E333C]" font="extraBold">
          {title}
        </Text>
      )}

      <View
        style={{
          height: height,
        }}
      >
        {height && (
          <FlashList
            data={response.body?.data}
            estimatedItemSize={ITEM_SIZE}
            renderItem={(item) => {
              return (
                <Fragment key={item.index}>
                  <BaseButton
                    className="border-[#f6f6f6] bg-[#fff] border-[1px] min-w-[50%] h-[92px] flex-auto m-[4px] rounded-[4px] justify-center items-center"
                    onClick={() => onBrandClick(item.item)}
                  >
                    <Image
                      style={{
                        height: "55%",
                        width: "55%",
                      }}
                      source={{
                        uri: item.item.logo,
                      }}
                      contentFit="contain"
                    />
                  </BaseButton>
                </Fragment>
              );
            }}
            numColumns={NUM_COLUMNS}
            onEndReached={fetchMore ? fetchMoreHandler : undefined}
            scrollEnabled={fetchMore}
            ListEmptyComponent={
              <View className="space-y-[8px]">
                {[...Array(limit / NUM_COLUMNS)].map((_, index) => {
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

      {showAllButton && (
        <MoreButton
          onClick={onShowAllButtonClick}
          value={t("BRANDS_LIST__SHOW_ALL_BRANDS")}
          cn="mt-[6px]"
        />
      )}
    </View>
  );
};

const Skeleton = () => {
  return (
    <View className="flex flex-row justify-between">
      <View className="w-[49%]">
        <MotiSkeleton
          show
          height={92}
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

      <View className="w-[49%]">
        <MotiSkeleton
          show
          height={92}
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
    </View>
  );
};

export default BrandsList;
