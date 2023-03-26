import { PageStructure } from "../../../src/components/organisms";
import {
  useStripe,
  CardField,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { useState } from "react";
import Constants from "expo-constants";
import { useTranslationsContext } from "../../../src/hooks";

const AddNewCard = () => {
  const { languageWithoutGender } = useTranslationsContext();

  const { createToken } = useStripe();
  const [token, setToken] = useState<unknown>();

  return (
    <PageStructure title="Add New Card">
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
