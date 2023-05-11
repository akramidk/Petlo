import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { Text } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { OrdersResponse } from "../../src/interfaces";
import Loading from "../_Loading";

// TODO add the autoship
// TODO add the delivery estimation
// TODO redesign the whole card + create an order page for more info

const Orders = () => {
  const { response } = useAPIFetching<void, OrdersResponse>({
    endpoint: Endpoints.ORDERS,
    options: {
      withPagination: true,
    },
  });

  if (response === undefined || response.isFetching) {
    return <Loading />;
  }

  return (
    <PageStructure title="Orders">
      <View className="space-y-[8px]">
        {response.body.data.map((order, i) => {
          return (
            <View
              key={i}
              className="w-full border-[1px] border-[#f6f6f6] rounded-[4px] px-[20px] py-[14px] space-y-[8px]"
            >
              <View className="flex-row justify-between">
                <Text font="extraBold" cn="text-[#222] text-[13.5px]">
                  Order No. {order.id}
                </Text>
                <Text font="bold" cn="text-[#666] text-[13.5px]">
                  {order.amount} {order.currency}
                </Text>
              </View>

              <View>
                <Text font="semiBold" cn="text-[#888] text-[13px]">
                  Order is {order.status}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </PageStructure>
  );
};

export default Orders;
