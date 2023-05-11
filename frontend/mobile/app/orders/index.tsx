import { PageStructure } from "../../src/components/organisms";
import { Endpoints } from "../../src/enums";
import { useAPIFetching } from "../../src/hooks";
import Loading from "../_Loading";

const Orders = () => {
  const { response } = useAPIFetching<void, void>({
    endpoint: Endpoints.ORDERS,
  });

  if (response === undefined || response.isFetching) {
    return <Loading />;
  }

  return <PageStructure title="Orders" />;
};

export default Orders;
