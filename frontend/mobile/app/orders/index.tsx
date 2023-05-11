import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import { OrdersResponse } from "../../src/interfaces";
import Loading from "../_Loading";

const Orders = () => {
  const { response } = useAPIFetching<void, OrdersResponse>({
    endpoint: Endpoints.ORDERS,
    options: {
      withPagination: true,
    },
  });

  console.log("response", response);

  if (response === undefined || response.isFetching) {
    return <Loading />;
  }

  return <PageStructure title="Orders" />;
};

export default Orders;
