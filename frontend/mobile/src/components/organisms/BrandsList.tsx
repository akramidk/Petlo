import { View } from "react-native";
import { Text, Link } from "../atoms";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
import {
  useAPIFetching,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../hooks";
import { Endpoints } from "../../enums";
import { BrandsListProps, BrandsResponse } from "../../interfaces";
import { BrandsRequest } from "../../interfaces/Endpoints/Brands";
import clsx from "clsx";
import { BaseButton } from "../bases";

const ITEM_SIZE = 99;
const NUM_COLUMNS = 2;

const BrandsList = ({
  limit,
  fetchMore = true,
  showAllButton,
  title,
  onShowAllButtonClick,
}: BrandsListProps) => {
  const { t } = useTranslationsContext();
  const { height } = useWindowDimensions();
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

  return (
    <View className="space-y-[8px]">
      {title && (
        <Text cn="text-[15px] text-[#0E333C]" font="extraBold">
          {title}
        </Text>
      )}

      <View
        style={{
          height: fetchMore ? height - 300 : (ITEM_SIZE / NUM_COLUMNS) * limit,
        }}
      >
        <FlashList
          data={response.body?.data}
          estimatedItemSize={ITEM_SIZE}
          renderItem={(item) => {
            return (
              <View className="border-[#f6f6f6] border-[1px] min-w-[50%] h-[92px] flex-auto m-[4px] rounded-[4px]">
                <Text>{item.item.name}</Text>
              </View>
            );
          }}
          numColumns={NUM_COLUMNS}
          onEndReached={fetchMore ? fetchMoreHandler : undefined}
          scrollEnabled={fetchMore}
        />
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

export default BrandsList;
