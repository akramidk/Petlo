import { View } from "react-native";
import { PageStructure } from "../../src/components/organisms";
import { Text } from "../../src/components/atoms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { OrdersResponse } from "../../src/interfaces";
import Loading from "../_Loading";

// TODO add the autoship
// TODO add the delivery estimation

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
      <View className="space-y-[6px]">
        {response.body.data.map((order, i) => {
          return (
            <View
              key={i}
              className="w-full border-[1px] border-[#f6f6f6] rounded-[4px] px-[20px] py-[14px] space-y-[8px]"
            >
              <View className="flex-row justify-between">
                <Text font="extraBold" cn="text-[#222]">
                  Order No. {order.id}
                </Text>
                <Text font="bold" cn="text-[#666]">
                  {order.amount} {order.currency}
                </Text>
              </View>

              <View>
                <Text font="semiBold" cn="text-[#888]">
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
