import { PageStructure } from "../../../src/components/organisms";
import {
  useStripe,
  CardField,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { useState } from "react";
import Constants from "expo-constants";
import {
  useAPIMutation,
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { useRouter } from "expo-router";
import { Endpoints } from "../../../src/enums";
import { AddNewCardRequest, AddNewCardResponse } from "../../../src/interfaces";
import { View } from "react-native";

const STRIPE_PUBLISHABLE_KEY =
  Constants.expoConfig.extra.STRIPE_PUBLISHABLE_KEY;

const AddNewCard = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { languageWithoutGender } = useInternationalizationContext();

  const { createToken } = useStripe();
  const [token, setToken] = useState<string>();
  const { trigger, status } = useAPIMutation<
    AddNewCardRequest,
    AddNewCardResponse
  >({
    endpoint: Endpoints.ADD_NEW_CARD,
    method: "POST",
    options: {
      onSucceeded: router.back,
      fireOnSucceededAfter: 1000,
    },
  });

  return (
    <PageStructure
      title={t("ADD_NEW_CARD__TITLE")}
      button={{
        value: t("ADD_NEW_CARD__ADD_BUTTON"),
        onClick: () =>
          trigger({
            token: token,
          }),
        status: status ?? (token ? "active" : "inactive"),
      }}
      link={{
        value: t("ADD_NEW_CARD__CANCEL_BUTTON"),
        onClick: router.back,
        status: status ? "inactive" : "active",
      }}
    >
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <CardField
          postalCodeEnabled={false}
          onCardChange={(card) => {
            createToken({
              type: "Card",
            }).then((response) => {
              setToken(response?.token?.id);
            });
          }}
          cardStyle={{
            borderRadius: 4,
            backgroundColor: "#f6f6f6",
            textColor: "#444444",
            fontSize: 14,
            placeholderColor: "#aaaaaa",
            textErrorColor: "#E64848",
            fontFamily:
              languageWithoutGender === "en"
                ? "Manrope_500Medium"
                : "IBMPlexSansArabic_400Regular",
          }}
          style={{
            height: 60,
            paddingRight: 50,
          }}
        />
      </StripeProvider>
    </PageStructure>
  );
};

export default AddNewCard;
