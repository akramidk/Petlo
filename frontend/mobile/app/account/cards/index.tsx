import { useRouter } from "expo-router";
import { PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching } from "../../../src/hooks";
import {
  CustomerCardsRequest,
  CustomerCardsResponse,
} from "../../../src/interfaces";
import Loading from "../../_Loading";

const Cards = () => {
  const router = useRouter();
  const { response } = useAPIFetching<
    CustomerCardsRequest,
    CustomerCardsResponse
  >({
    endpoint: Endpoints.CUSTOMER_CARDS,
    body: {
      page: 1,
    },
  });

  console.log("response", response);

  if (response.isFetching) {
    <Loading />;
  }

  return (
    <PageStructure
      title="Cards"
      button={{
        value: "Add New Card",
        onClick: () => router.push("/account/cards/add-new-card"),
      }}
      backButton={router.back}
    />
  );
};

export default Cards;
