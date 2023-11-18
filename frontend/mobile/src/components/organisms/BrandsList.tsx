import { View } from "react-native";
import { Text, Link } from "../atoms";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
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

const ITEM_SIZE = 99;
const NUM_COLUMNS = 2;

const BrandsList = ({
  limit,
  fetchMore = true,
  showAllButton,
  title,
  onShowAllButtonClick,
  onBrandClick,
}: BrandsListProps) => {
  const { t } = useTranslationsContext();
  const layout = usePageStructureLayout();
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
    },
  });

  const height = fetchMore ? layout?.height : (ITEM_SIZE / NUM_COLUMNS) * limit;
  const isFetchingMore = response.body?.data && response.isFetching;

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
                <BaseButton
                  className="border-[#f6f6f6] border-[1px] min-w-[50%] h-[92px] flex-auto m-[4px] rounded-[4px]"
                  onClick={() => onBrandClick(item.item)}
                >
                  <Text>{item.item.name}</Text>
                </BaseButton>
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
            ListFooterComponent={
              isFetchingMore ? (
                <View className="mt-[8px]">
                  <Skeleton />
                </View>
              ) : undefined
            }
            onEndReachedThreshold={0.5}
          />
        )}
      </View>

      {showAllButton && (
        <BaseButton
          cn="w-[100%] bg-[#f6f6f6] rounded-[4px] items-center justify-center p-[12px]"
          onClick={onShowAllButtonClick}
        >
          <Text cn="text-[14px] text-[#333]" font="bold">
            {t("BRANDS_LIST__SHOW_ALL_BRANDS")}
          </Text>
        </BaseButton>
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
