import { View } from "react-native";
import { Text, Link } from "../atoms";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
import { useAPIFetching, useInternationalizationContext } from "../../hooks";
import { Endpoints } from "../../enums";
import { BrandsResponse } from "../../interfaces";
import { BrandsRequest } from "../../interfaces/Endpoints/Brands";
import clsx from "clsx";

interface BrandsList {
  limit: number;
  fetchMore?: boolean;
  title?: string;
  showAllButton?: Boolean;
  onShowAllButtonClick?: () => void;
}

const ITEM_SIZE = 99;
const NUM_COLUMNS = 2;

const BrandsList = ({
  limit,
  fetchMore = true,
  showAllButton,
  title,
  onShowAllButtonClick,
}: BrandsList) => {
  const { height } = useWindowDimensions();
  const { direction } = useInternationalizationContext();
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
    <View>
      {(showAllButton || title) && (
        <View
          className={clsx(
            "justify-between items-center mb-[12px]",
            direction === "ltr" ? "flex-row" : "flex-row-reverse"
          )}
        >
          {title && (
            <Text cn="text-[15px] text-[#0E333C] w-[75%]" font="extraBold">
              {title}
            </Text>
          )}

          {showAllButton && (
            <Link
              onClick={onShowAllButtonClick}
              value="Show All"
              valueCN="text-[14px] text-[#777]"
              font="semiBold"
            />
          )}
        </View>
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
    </View>
  );
};

export default BrandsList;
