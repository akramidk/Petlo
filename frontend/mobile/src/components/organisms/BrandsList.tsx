import { View } from "react-native";
import { Text } from "../atoms";
import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
import { useAPIFetching } from "../../hooks";
import { Endpoints } from "../../enums";
import { BrandsResponse } from "../../interfaces";
import { BrandsRequest } from "../../interfaces/Endpoints/Brands";

const BrandsList = () => {
  const { height } = useWindowDimensions();
  const { response, fetchMore } = useAPIFetching<BrandsRequest, BrandsResponse>(
    {
      endpoint: Endpoints.BRANDS,
      options: {
        withPagination: true,
      },
      body: {
        limit: 12,
      },
    }
  );

  return (
    <View style={{ height: height - 300 }}>
      <FlashList
        data={response.body?.data}
        estimatedItemSize={92}
        renderItem={(item) => {
          return (
            <View className="border-[#f6f6f6] border-[1px] min-w-[50%] h-[92px] flex-auto m-[4px] rounded-[4px]">
              <Text>{item.item.name}</Text>
            </View>
          );
        }}
        numColumns={1}
        onEndReached={() => {
          if (response.isFetching === false && response.body?.has_more) {
            fetchMore();
          }
        }}
      />
    </View>
  );
};

export default BrandsList;
