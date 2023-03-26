import { PageStructure } from "../../../src/components/organisms";
import {
  useStripe,
  CardField,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { useState } from "react";
import Constants from "expo-constants";
import {
  useInternationalizationContext,
  useTranslationsContext,
} from "../../../src/hooks";
import { useRouter } from "expo-router";

const AddNewCard = () => {
  const router = useRouter();
  const { t } = useTranslationsContext();
  const { languageWithoutGender } = useInternationalizationContext();

  const { createToken } = useStripe();
  const [token, setToken] = useState<unknown>();

  return (
    <PageStructure
      title={t("ADD_NEW_CARD__TITLE")}
      button={{
        value: t("ADD_NEW_CARD__ADD_BUTTON"),
        onClick: () => {},
        status: token ? "active" : "inactive",
      }}
      link={{
        value: t("ADD_NEW_CARD__CANCEL_BUTTON"),
        onClick: router.back,
      }}
    >
      <StripeProvider
        publishableKey={Constants.expoConfig.extra.STRIPE_PUBLISHABLE_KEY}
      >
        <CardField
          postalCodeEnabled={false}
          onCardChange={() => {
            createToken({
              type: "Card",
            }).then((response) => setToken(response?.token?.id));
          }}
          cardStyle={{
            textColor: "#444",
            fontSize: 14,
            placeholderColor: "#aaa",
            textErrorColor: "#E64848",
            fontFamily:
              languageWithoutGender === "en"
                ? "Manrope_500Medium"
                : "IBMPlexSansArabic_400Regular",
          }}
          style={{
            height: 60,
            backgroundColor: "#f6f6f6",
            borderRadius: 4,
            paddingRight: 50,
          }}
        />
      </StripeProvider>
    </PageStructure>
  );
};

export default AddNewCard;
