import { useRouter } from "expo-router";
import { useMemo } from "react";
import { DataCards, PageStructure } from "../../../src/components/organisms";
import { Endpoints } from "../../../src/enums";
import {
  useAPIFetching,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import {
  CustomerCardsRequest,
  CustomerCardsResponse,
  DataCardProps,
} from "../../../src/interfaces";
import Loading from "../../_Loading";
import { PaymentIcon } from "react-native-payment-icons";
import { View } from "react-native";
import clsx from "clsx";

type brand =
  | "american-express"
  | "diners-club"
  | "discover"
  | "jcb"
  | "mastercard"
  | "unionpay"
  | "visa";

const Cards = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { direction } = useInternationalizationContext();

  const { response, fetchMore, round } = useAPIFetching<
    CustomerCardsRequest,
    CustomerCardsResponse
  >({
    endpoint: Endpoints.CUSTOMER_CARDS,
    options: {
      withPagination: true,
    },
  });

  const cards: DataCardProps[] = useMemo(() => {
    if (response.isFetching) return;

    return response.body.data.map((card) => {
      return {
        primaryText: `**** **** **** ${card.last4}`,
        secondaryText: t("CARDS__EXPIRES_IN", {
          expMonth: card.exp_month,
          expYear: card.exp_year,
        }),
        prefixChild: (
          <View
            className={clsx(
              "items-center justify-center",
              direction === "ltr" ? "mr-[20px]" : "ml-[20px]"
            )}
          >
            <PaymentIcon
              type={card.brand.replace(" ", "-") as brand}
              width={36}
            />
          </View>
        ),
      };
    });
  }, [response]);

  if (response.isFetching && round === 1) {
    return <Loading />;
  }

  return (
    <PageStructure
      title={t("CARDS__TITLE")}
      button={{
        value: t("CARDS__ADD_NEW_CARD_BUTTON"),
        onClick: () => router.push("/account/cards/add-new-card"),
      }}
      backButton={router.back}
    >
      <DataCards
        data={cards}
        onEndReached={response.body.has_more ? fetchMore : undefined}
      />
    </PageStructure>
  );
};

export default Cards;
