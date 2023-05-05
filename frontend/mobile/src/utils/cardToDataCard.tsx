import clsx from "clsx";
import { View } from "react-native";
import { PaymentIcon } from "react-native-payment-icons";
import { Card, DataCardProps } from "../interfaces";

type brand =
  | "american-express"
  | "diners-club"
  | "discover"
  | "jcb"
  | "mastercard"
  | "unionpay"
  | "visa";

interface CardToDataCardProps {
  card: Card;
  direction: any;
  t: any;
}

const cardToDataCard = ({
  card,
  direction,
  t,
}: CardToDataCardProps): DataCardProps => {
  return {
    primaryText: `**** **** **** ${card.last4}`,
    secondaryText: t("CARD_TO_DATA_CARD__EXPIRES_IN", {
      expMonth: card.exp_month,
      expYear: card.exp_year,
    }),
    prefixChild: (
      <View
        className={clsx(
          "items-center justify-center ",
          direction === "ltr" ? "mr-[20px]" : "ml-[20px]"
        )}
      >
        <PaymentIcon type={card.brand.replace(" ", "-") as brand} width={36} />
      </View>
    ),
  };
};

export default cardToDataCard;
