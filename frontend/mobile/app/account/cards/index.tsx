import { useRouter } from "expo-router";
import { useMemo } from "react";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import { useAPIFetching } from "../../../src/hooks";
import {
  CustomerCardsRequest,
  CustomerCardsResponse,
  DataCardProps,
} from "../../../src/interfaces";
import Loading from "../../_Loading";
import { PaymentIcon } from "react-native-payment-icons";
import { View } from "react-native";

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

  const data: DataCardProps[] = useMemo(() => {
    if (response.isFetching) return;

    return response.body.data.map((card) => {
      return {
        primaryText: `**** **** **** ${card.last4}`,
        secondaryText: `Expires in ${card.exp_month}/${card.exp_year}`,
        leftChild: (
          <View className="items-center justify-center mr-[20px]">
            <PaymentIcon type={card.brand} width={36} />
          </View>
        ),
      };
    });
  }, [response]);

  if (response.isFetching) {
    return <Loading />;
  }

  console.log("response", response.body.data);

  return (
    <PageStructure
      title="Cards"
      button={{
        value: "Add New Card",
        onClick: () => router.push("/account/cards/add-new-card"),
      }}
      backButton={router.back}
    >
      <DataCards data={data} />
    </PageStructure>
  );
};

export default Cards;
